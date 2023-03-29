import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { iOrdenRepository } from '../repositories/orden.repository';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';
import { OrdenEntity } from '../entities/orden.orm';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { pdtcb_odEntity } from '../entities/pdtcb_od.orm';
import { OrdenDto } from 'src/orden/application/dto/orden.dto';
import { LugarEntity } from 'src/ordenar_pedidos/infrastructure/entities/lugar.entity';
import { orden_lugarEntity } from '../entities/orden_lugar.orm';

@Injectable()
export class ordenPersisteceAdapter implements iOrdenRepository {
  constructor(
    @InjectRepository(OrdenEntity)
    private readonly ordenRepository: Repository<OrdenEntity>,
    @InjectRepository(pdtcb_odEntity)
    private readonly pdtcb_odRepository: Repository<pdtcb_odEntity>,
    @InjectRepository(LugarEntity)
    private readonly lugarRepository: Repository<LugarEntity>,
    @InjectRepository(orden_lugarEntity)
    private readonly ordenLugarRepository: Repository<orden_lugarEntity>,
  ) {}

  async createOrdenId(): Promise<any> {
    const orden = new OrdenEntity();
    orden.orden_id = new UniqueId().getId();

    // Obtener la fecha y hora actual
    const fechaActual = new Date();
    const fecha = `${fechaActual.getFullYear()}-${
      fechaActual.getMonth() + 1
    }-${fechaActual.getDate()}`;

    // Obtener la última orden del día actual
    const ultimaOrden = await this.ordenRepository.findOne({
      where: {
        fecha_orden: fecha,
      },
      order: {
        numero_orden: 'DESC',
      },
    });

    // Asignar el nuevo número de orden
    orden.numero_orden = ultimaOrden ? parseInt(ultimaOrden.numero_orden.toString()) + 1 : 1;
    orden.fecha_orden = fecha;

    await this.ordenRepository.save(orden);

    return { orden_id: orden.orden_id, numero_orden: orden.numero_orden };
  }

  async getProductsByOrderId(orderId: createOrdenIdDto): Promise<any[]> {
    const pdtcb_odRecords = await this.pdtcb_odRepository.find({
      where: { orden_id: orderId.id },
      relations: ['producto'],
  });

    const products = pdtcb_odRecords.flatMap((pdtcb_od) => pdtcb_od.producto);

    return products;
  }

  async getOrderId(orderId: createOrdenIdDto): Promise<any> {
    const order = await this.ordenRepository.findOne({
      where: { orden_id: orderId.id },
  });

    return order;
  }

  async deleteOrderId(orderId: createOrdenIdDto): Promise<any> {
    await this.ordenRepository.delete(orderId.id);
    return {};
  }

  async procesarOrdenId(orderId: createOrdenIdDto, orden: OrdenDto): Promise<any> {
    const horaActual = new Date();
    const horaOrden = horaActual.toLocaleTimeString();

    if(orden.numero_mesa){
     const result = await this.ordenRepository.update(orderId.id, { hora_orden: horaOrden, descuento: orden.descuento.toString(), tipo_orden: orden.tipo_orden, cliente_id: orden.cliente_id, numero_mesa: orden.numero_mesa});
    
      if (result.affected === 0) {
        throw new NotFoundException(`Orden con id ${orderId.id} no encontrada`);
      }
    } else if (orden.tipo_orden === "delivery"){
        const result = await this.ordenRepository.update(orderId.id, { hora_orden: horaOrden, descuento: orden.descuento.toString(), tipo_orden: orden.tipo_orden, cliente_id: orden.cliente_id});

      const lugar = await this.lugarRepository.findOne({
      where: { id_lugar: orden.lugar_id },
      });

        const lugarDireccion = new LugarEntity();
        lugarDireccion.id_lugar = new UniqueId().getId();
        lugarDireccion.nombre_lugar = orden.direccion;
        lugarDireccion.id_padre_lugar = lugar.id_lugar;
        lugarDireccion.tipo_lugar = "Dirección";

        await this.lugarRepository.save(lugarDireccion);
        
      if (lugar) {
      // Crear una instancia de orden_lugarEntity
        const ordenLugar = new orden_lugarEntity();
        ordenLugar.orden_lugar_id = new UniqueId().getId();
        ordenLugar.orden_id = orderId.id;
        ordenLugar.lugar_id = lugarDireccion.id_lugar ;
        ordenLugar.precio_historico = lugar.precio_lugar.toString();

        // Guardar la entidad en la base de datos
        await this.ordenLugarRepository.save(ordenLugar);

      }
        if (result.affected === 0) {
            throw new NotFoundException(`Orden con id ${orderId.id} no encontrada`);
        }
    }else{
        const result = await this.ordenRepository.update(orderId.id, { hora_orden: horaOrden, descuento: orden.descuento.toString(), tipo_orden: orden.tipo_orden, cliente_id: orden.cliente_id});

        if (result.affected === 0) {
            throw new NotFoundException(`Orden con id ${orderId.id} no encontrada`);
        }
    }



    return {};
}

async obtenerTodasLasOrdenesConDetalle(): Promise<any[]> {
  const ordenes = await this.ordenRepository.find({
    relations: ['cliente', 'orden_lugar', 'orden_lugar.lugar', 'orden_lugar.lugar.lugarPadre', 'pdtcb_od', 'pdtcb_od.producto', 'pdtcb_od.combo'],
  });
  console.log('Vamo a ver que tal', ordenes);
  
  const resultado = ordenes.map((orden) => ({
    orden_id: orden.orden_id,
    fecha_orden: orden.fecha_orden,
    hora_orden: orden.hora_orden,
    numero_mesa: orden.numero_mesa,
    descuento: orden.descuento,
    tipo_orden: orden.tipo_orden,
    numero_orden: orden.numero_orden,
    cliente: {
      id_cliente: orden.cliente.id_cliente,
      cedula_cliente: orden.cliente.cedula_cliente,
      nombre_cliente: orden.cliente.nombre_cliente,
      apellido_cliente: orden.cliente.apellido_cliente,
      telefono_cliente: orden.cliente.telefono_cliente,
      lugar: orden.cliente.lugar,
    },
    lugar: orden.orden_lugar.map((ordenLugar) => ({
      orden_lugar_id: ordenLugar.orden_lugar_id,
      lugar_id: ordenLugar.lugar_id,
      lugar: {
        lugar_id: ordenLugar.lugar.id_lugar,
        nombre: ordenLugar.lugar.nombre_lugar,
        lugarPadre: {
          lugar_id: ordenLugar.lugar.lugarPadre?.id_lugar,
          nombre: ordenLugar.lugar.lugarPadre?.nombre_lugar,
        },
      },
      precio_historico: ordenLugar.precio_historico,
    })),
    productos: orden.pdtcb_od.map((productoOrden) => ({
      pdtcb_od_id: productoOrden.pdtcb_od_id,
      producto_id: productoOrden.producto?.producto_id,
      producto_nombre: productoOrden.producto?.nombre_producto,
      combo_id: productoOrden.combo?.combo_id,
      combo_nombre: productoOrden.combo?.nombre_combo,
    })),
  }));

  return resultado;
}

}