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
import { estadoEntity } from '../entities/estado.orm';
import { estado_ordenEntity } from '../entities/estado_orden.orm';
import { ordenEstadoDto } from 'src/orden/application/dto/ordenEstado.dto';
import { pagoElectronicoEntity } from '../entities/pagoElectronico.orm';
import { pagoEfectivoEntity } from '../entities/pagoEfectivo.orm';
import { zelleEntity } from '../entities/zelle.orm';
import { pagoDto } from 'src/orden/application/dto/pago.dto';
import { ordenPagoEntity } from '../entities/orden_pago.orm';

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
    @InjectRepository(estadoEntity)
    private readonly estadoRepository: Repository<estadoEntity>,
    @InjectRepository(estado_ordenEntity)
    private readonly estadoOrdenRepository: Repository<estadoEntity>,
    @InjectRepository(pagoElectronicoEntity)
    private readonly pagoElectronicoERepository: Repository<pagoElectronicoEntity>,
    @InjectRepository(pagoEfectivoEntity)
    private readonly pagoEfectivoRepository: Repository<pagoEfectivoEntity>,
    @InjectRepository(zelleEntity)
    private readonly zelleRepository: Repository<zelleEntity>,
    @InjectRepository(ordenPagoEntity)
    private readonly ordenPagoRepository: Repository<ordenPagoEntity>
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
     const result = await this.ordenRepository.update(orderId.id, { hora_orden: horaOrden, descuento: orden.descuento.toString(), tipo_orden: orden.tipo_orden, cliente_id: orden.cliente_id, numero_mesa: orden.numero_mesa, total_orden: orden.total_orden});
    
      if (result.affected === 0) {
        throw new NotFoundException(`Orden con id ${orderId.id} no encontrada`);
      }
    } else if (orden.tipo_orden === "delivery"){
        const result = await this.ordenRepository.update(orderId.id, { hora_orden: horaOrden, descuento: orden.descuento.toString(), tipo_orden: orden.tipo_orden, cliente_id: orden.cliente_id, total_orden: orden.total_orden});

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
        const result = await this.ordenRepository.update(orderId.id, { hora_orden: horaOrden, descuento: orden.descuento.toString(), tipo_orden: orden.tipo_orden, cliente_id: orden.cliente_id, total_orden: orden.total_orden});

        if (result.affected === 0) {
            throw new NotFoundException(`Orden con id ${orderId.id} no encontrada`);
        }
    }

    const estadoProceso = await this.estadoRepository.findOne({
      where: { nombre_estado: 'En proceso' },
    });

    

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Añadimos 1 porque los meses empiezan desde 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    const estado_orden = new estado_ordenEntity();
    estado_orden.estado_orden_id = new UniqueId().getId();
    estado_orden.estado_id = estadoProceso.estado_id;
    estado_orden.orden_id = orderId.id;
    estado_orden.fecha_historial = formattedDate;

    await this.estadoOrdenRepository.save(estado_orden);

    return {};
}

async obtenerTodasLasOrdenesConDetalle(): Promise<any[]> {
  const ordenes = await this.ordenRepository.find({
    relations: [
      'cliente',
      'orden_lugar',
      'orden_lugar.lugar',
      'orden_lugar.lugar.lugarPadre',
      'pdtcb_od',
      'pdtcb_od.producto',
      'pdtcb_od.combo',
      'estado_orden',
      'estado_orden.estado',
    ],
  });
  
  const resultado = ordenes.map((orden) => ({
    orden_id: orden.orden_id,
    fecha_orden: orden.fecha_orden,
    hora_orden: orden.hora_orden,
    numero_mesa: orden.numero_mesa,
    descuento: orden.descuento,
    tipo_orden: orden.tipo_orden,
    numero_orden: orden.numero_orden,
    total_orden: orden.total_orden,
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
    estado: orden.estado_orden.map((estadoOrden) => ({
      estado_orden_id: estadoOrden.estado_orden_id,
      fecha_historial: estadoOrden.fecha_historial,
      orden_id: estadoOrden.orden_id,
      estado_id: estadoOrden.estado_id,
      estado: {
        estado_id: estadoOrden.estado?.estado_id,
        nombre_estado: estadoOrden.estado?.nombre_estado,
      },
    })),
  }));
 
  return resultado;
}

  async getEstados(): Promise<any[]> {
    const estados = await this.estadoRepository.find();
    return estados;
  }


  async createOrdenEstado(estadoOrden: ordenEstadoDto): Promise<any> {
    const orden = new OrdenEntity();
    orden.orden_id = new UniqueId().getId();

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Añadimos 1 porque los meses empiezan desde 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    const estado_orden = new estado_ordenEntity();
    estado_orden.estado_orden_id = new UniqueId().getId();
    estado_orden.estado_id = estadoOrden.estado_id;
    estado_orden.orden_id = estadoOrden.orden_id;
    estado_orden.fecha_historial = formattedDate;
    await this.estadoOrdenRepository.save(estado_orden);


    return {};
  }


    async createOrdenPago(orderId: createOrdenIdDto, pago: pagoDto): Promise<any> {;
    if (pago.tipo_pago === "electronico"){
    console.log('Pago electronico')
    const pagoElectronico = new pagoElectronicoEntity()
    pagoElectronico.pago_id = new UniqueId().getId();
    pagoElectronico.tipo_pago = pago.pagoElectronico.tipo_pago;
    pagoElectronico.numero_referencia = pago.pagoElectronico.numero_referencia;
    await this.pagoElectronicoERepository.save(pagoElectronico);
    
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Añadimos 1 porque los meses empiezan desde 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
    const ordenPago = new ordenPagoEntity();
    ordenPago.orden_pago_id = new UniqueId().getId();
    ordenPago.orden_id = orderId.id;
    ordenPago.pago_id = pagoElectronico.pago_id;
    ordenPago.fecha_historial =formattedDate;
    ordenPago.monto = pago.monto;

    await this.ordenPagoRepository.save(ordenPago)
    

    } else if(pago.tipo_pago === "efectivo"){
    console.log('Entro en efectivo')
    const pagoEfectivo = new pagoEfectivoEntity()
    pagoEfectivo.dolares_efectivo_id = new UniqueId().getId();
    pagoEfectivo.tipo_pago = pago.pagoEfectivo.tipo_pago;
    pagoEfectivo.denominacion = pago.pagoEfectivo.denominacion;
    pagoEfectivo.numero_serie = pago.pagoEfectivo.numero_serie;
    pagoEfectivo.cantidad_billetes = pago.pagoEfectivo.cantidad_billetes;

    await this.pagoEfectivoRepository.save(pagoEfectivo);

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Añadimos 1 porque los meses empiezan desde 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
    const ordenPago = new ordenPagoEntity();
    ordenPago.orden_pago_id = new UniqueId().getId();
    ordenPago.orden_id = orderId.id;
    ordenPago.dolares_efectivo_id = pagoEfectivo.dolares_efectivo_id;
    ordenPago.fecha_historial =formattedDate;
    ordenPago.monto = pago.monto;

    await this.ordenPagoRepository.save(ordenPago)

    }else{
    console.log('Entro en zelle')
    const zelle = new zelleEntity()
    zelle.zelle_id = new UniqueId().getId();
    zelle.correo_electronico = pago.zelle.correo_electronico;

    await this.zelleRepository.save(zelle);

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Añadimos 1 porque los meses empiezan desde 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
    const ordenPago = new ordenPagoEntity();
    ordenPago.orden_pago_id = new UniqueId().getId();
    ordenPago.orden_id = orderId.id;
    ordenPago.zelle_id = zelle.zelle_id;
    ordenPago.fecha_historial =formattedDate;
    ordenPago.monto = pago.monto;
    await this.ordenPagoRepository.save(ordenPago)
    
    }
    return {};
  }

async getAllPagos(orderId: createOrdenIdDto): Promise<any[]> {
  try {
    const ordenes = await ordenPagoEntity.find({
      where: { orden_id: orderId.id },
      relations: ['pagoElectronico', 'pagoEfectivo', 'zelle'],
    });

    if (ordenes.length === 0) {
      console.log(`No se encontró una orden con ID ${orderId.id}`);
      return null;
    }

    const pagos = ordenes.flatMap((orden) => [
      ...(orden.pagoElectronico
        ? [
            {
              tipo_pago: 'electrónico',
              numero_referencia: orden.pagoElectronico.numero_referencia,
              tipo_electronico: orden.pagoElectronico.tipo_pago,
              fecha_historial: orden.fecha_historial,
              monto: orden.monto
            },
          ]
        : []),
      ...(orden.pagoEfectivo
        ? [
            {
              tipo_pago: 'efectivo',
              numero_serie: orden.pagoEfectivo.numero_serie,
              denominacion: orden.pagoEfectivo.denominacion,
              cantidad_billetes: orden.pagoEfectivo.cantidad_billetes,
              tipo_efectivo: orden.pagoEfectivo.tipo_pago,
              fecha_historial: orden.fecha_historial,
              monto: orden.monto
            },
          ]
        : []),
      ...(orden.zelle
        ? [
            {
              tipo_pago: 'Zelle',
              correo_electronico: orden.zelle.correo_electronico,
              fecha_historial: orden.fecha_historial,
              monto: orden.monto
            },
          ]
        : []),
    ]);

    return pagos;
  } catch (error) {
    console.log(`Error al obtener los pagos para la orden con ID ${orderId.id}`);
    console.error(error);
    return null;
  }
}
}
