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
import { montoBsDto } from 'src/orden/application/dto/montoBs.dto';
import { montoBs_DolaresEntity } from '../entities/montoBS_Dolares.orm';
import { registro_productoEntity } from '../entities/registroProducto.orm';
import { ordenPago_pagoEfectivoEntity } from '../entities/ordenPago_PagoEfectivo.orm';

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
    private readonly ordenPagoRepository: Repository<ordenPagoEntity>,
    @InjectRepository(montoBs_DolaresEntity)
    private readonly montoBsRepository: Repository<montoBs_DolaresEntity>,
    @InjectRepository(registro_productoEntity)
    private readonly registro_productoRepository: Repository<registro_productoEntity>,
    @InjectRepository(ordenPago_pagoEfectivoEntity)
    private readonly ordenPago_pagoEfectivoRepository: Repository<ordenPago_pagoEfectivoEntity>
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
    relations: ['producto', 'registro_producto', 'registro_producto.ingrediente'],
  });

  const productos = pdtcb_odRecords.flatMap((pdtcb_od) => pdtcb_od.producto);
  const registrosProducto = pdtcb_odRecords.flatMap((pdtcb_od) => pdtcb_od.registro_producto);

  const costoProductos = productos.reduce((total, producto) => {
    return total + parseFloat(producto.costo_producto);
  }, 0);

  const costoIngredientes = registrosProducto.reduce((total, registroProducto) => {
    const precio = registroProducto.precio ? parseFloat(registroProducto.precio) : 0;
    return total + precio;
  }, 0);

  const costoTotal = costoProductos + costoIngredientes;

  const result = productos.map((producto, index) => {
    const registrosProductoProducto = registrosProducto.filter(
      (registroProducto) =>
        registroProducto.producto_id === producto.producto_id && registroProducto.pdtcb_od_id === pdtcb_odRecords[index].pdtcb_od_id,
    );
    const ingredientes = registrosProductoProducto.map((registroProducto) => registroProducto.ingrediente.nombre_ingrediente);
    const precioIngredientes = registrosProductoProducto.reduce((total, registroProducto) => {
      const precio = registroProducto.precio ? parseFloat(registroProducto.precio) : 0;
      return total + precio;
    }, 0);
    return {
      ...producto,
      ingredientes,
      costoTotal: costoTotal.toFixed(2),
      costoProducto: parseFloat(producto.costo_producto).toFixed(2),
      costoIngredientes: precioIngredientes.toFixed(2),
    };
  });

  return result;
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
      'pdtcb_od.registro_producto',
      'pdtcb_od.registro_producto.ingrediente',
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
    // iterar sobre los productos de la orden
    productos: orden.pdtcb_od.map((productoOrden) => {
      const idProducto = productoOrden.producto?.producto_id
      const detallesProducto = {
        pdtcb_od_id: productoOrden.pdtcb_od_id,
        producto_id: idProducto,
        producto_nombre: productoOrden.producto?.nombre_producto,
        combo_id: productoOrden.combo?.combo_id,
        combo_nombre: productoOrden.combo?.nombre_combo,
        ingredientes: [],
      };
      
      // filtrar los registros de producto correspondientes a este producto de la orden
      const registrosProducto = productoOrden.registro_producto.filter((registroProducto) => {
        return registroProducto.producto_id === idProducto && registroProducto.pdtcb_od_id === productoOrden.pdtcb_od_id;
      });
      // iterar sobre los registros de producto filtrados y agregar los ingredientes correspondientes
      registrosProducto.forEach((registroProducto) => {
        detallesProducto.ingredientes.push({
          registro_producto_id: registroProducto.registro_producto_id,
          ingrediente_id: registroProducto.ingrediente?.ingrediente_id,
          ingrediente_nombre: registroProducto.ingrediente?.nombre_ingrediente,
          cantidad: registroProducto.cantidad,
          precio: registroProducto.precio
        });
      });
      
      return detallesProducto;
    }),
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

    async createOrdenPago(orderId: createOrdenIdDto, pago: pagoDto): Promise<any> {
    
    if (pago.tipo_pago === "electronico"){
    const montos = await this.montoBsRepository.find();
    const lastMonto = montos.reduce((prev, current) => {
      const prevDate = new Date(prev.fecha_historial);
      const currentDate = new Date(current.fecha_historial);
      return prevDate > currentDate ? prev : current;
    });
    const lastMontoId = lastMonto.montobs_dolares_id;
    const lastMontoBs = lastMonto.monto;

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
    
    const montoDolares = parseFloat(pago.monto) / parseFloat(lastMontoBs);

    const ordenPago = new ordenPagoEntity();
    ordenPago.orden_pago_id = new UniqueId().getId();
    ordenPago.orden_id = orderId.id;
    ordenPago.pago_id = pagoElectronico.pago_id;
    ordenPago.fecha_historial =formattedDate;
    ordenPago.monto = pago.monto;
    ordenPago.monto_dolares = montoDolares.toFixed(2).toString()
    ordenPago.montobs_dolares_id = lastMontoId
    await this.ordenPagoRepository.save(ordenPago)


  } else if (pago.tipo_pago === "efectivo") {
    console.log('Prueba 1')
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    const montos = await this.montoBsRepository.find();
    const lastMonto = montos.reduce((prev, current) => {
      const prevDate = new Date(prev.fecha_historial);
      const currentDate = new Date(current.fecha_historial);
      return prevDate > currentDate ? prev : current;
    });
    const lastMontoId = lastMonto.montobs_dolares_id;
    const lastMontoBs = lastMonto.monto;

    const promises = [];

      console.log('Prueba 2')
      const newOrdenPago = new ordenPagoEntity();
      newOrdenPago.orden_pago_id = new UniqueId().getId();
      newOrdenPago.orden_id = orderId.id;
      newOrdenPago.fecha_historial = formattedDate;
      newOrdenPago.monto = pago.monto;
      newOrdenPago.monto_dolares = pago.monto;
      newOrdenPago.montobs_dolares_id = lastMontoId;
      promises.push(this.ordenPagoRepository.save(newOrdenPago));

    if(pago.pagoEfectivo.length !== 0){
    let totalPagoEfectivo = 0; // variable para seguir el total de los pagos en efectivo
    for (const pagoEfectivo of pago.pagoEfectivo) {
      console.log('Prueba 3')
      const newPagoEfectivo = new pagoEfectivoEntity();
      newPagoEfectivo.dolares_efectivo_id = new UniqueId().getId();
      newPagoEfectivo.tipo_pago = pagoEfectivo.currency;
      newPagoEfectivo.denominacion = pagoEfectivo.denomination;
      newPagoEfectivo.numero_serie = pagoEfectivo.serialNumber;
      newPagoEfectivo.cantidad_billetes = pagoEfectivo.cantidadBilletes;

      const montoPagoEfectivo = parseFloat(pagoEfectivo.denomination) * parseFloat(pagoEfectivo.cantidadBilletes); // monto a agregar a la suma total
      totalPagoEfectivo += montoPagoEfectivo; // se agrega el monto a la suma total
      promises.push(this.pagoEfectivoRepository.save(newPagoEfectivo));
    
      console.log('Prueba 4')
      const newOrdenPagoPagoEfectivo = new ordenPago_pagoEfectivoEntity();
      newOrdenPagoPagoEfectivo.pagoefectivo_ordenpago_id = new UniqueId().getId();
      newOrdenPagoPagoEfectivo.orden_pago_id = newOrdenPago.orden_pago_id ;
      newOrdenPagoPagoEfectivo.dolares_efectivo_id = newPagoEfectivo.dolares_efectivo_id;

      promises.push(this.ordenPago_pagoEfectivoRepository.save(newOrdenPagoPagoEfectivo));
      console.log('Prueba 5')
    }

    if(pago.tipo_pago_efectivo === "Bs."){
      const montoDolares = totalPagoEfectivo / parseFloat(lastMontoBs);
      this.ordenPagoRepository.update(newOrdenPago.orden_pago_id, {monto: totalPagoEfectivo.toFixed(2).toString(), monto_dolares: totalPagoEfectivo.toFixed(2).toString()});
    } 
    this.ordenPagoRepository.update(newOrdenPago.orden_pago_id, {monto: totalPagoEfectivo.toFixed(2).toString(), monto_dolares: totalPagoEfectivo.toFixed(2).toString()});
    } else {
      console.log('Prueba 3')
      const newPagoEfectivo = new pagoEfectivoEntity();
      newPagoEfectivo.dolares_efectivo_id = new UniqueId().getId();
      newPagoEfectivo.tipo_pago = pago.tipo_pago_efectivo;
      promises.push(this.pagoEfectivoRepository.save(newPagoEfectivo));
      if(pago.tipo_pago_efectivo === "Bs."){
      console.log('Res monto',pago.monto)
      console.log('Res lastMontoBs',lastMontoBs)
      const montoDolares = parseFloat(pago.monto) / parseFloat(lastMontoBs);
      console.log('Res monto',montoDolares)
      this.ordenPagoRepository.update(newOrdenPago.orden_pago_id, {monto_dolares:montoDolares.toFixed(2).toString()});
      } 
      
      console.log('Prueba 4')
      const newOrdenPagoPagoEfectivo = new ordenPago_pagoEfectivoEntity();
      newOrdenPagoPagoEfectivo.pagoefectivo_ordenpago_id = new UniqueId().getId();
      newOrdenPagoPagoEfectivo.orden_pago_id = newOrdenPago.orden_pago_id ;
      newOrdenPagoPagoEfectivo.dolares_efectivo_id = newPagoEfectivo.dolares_efectivo_id;

      promises.push(this.ordenPago_pagoEfectivoRepository.save(newOrdenPagoPagoEfectivo));
      console.log('Prueba 5')
    }
    
    console.log('Prueba 6')
    await Promise.all(promises);
    }else{

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
    const montos = await this.montoBsRepository.find();
    const lastMonto = montos.reduce((prev, current) => {
      const prevDate = new Date(prev.fecha_historial);
      const currentDate = new Date(current.fecha_historial);
      return prevDate > currentDate ? prev : current;
    });
    const lastMontoId = lastMonto.montobs_dolares_id;
    ordenPago.montobs_dolares_id = lastMontoId

    await this.ordenPagoRepository.save(ordenPago)
    
    }
    return {};
  }

async getAllPagos(orderId: createOrdenIdDto): Promise<any[]> {
  try {
    const ordenes = await ordenPagoEntity.find({
      where: { orden_id: orderId.id },
      relations: ['pagoElectronico', 'zelle', 'montoBs_Dolares', 'ordenPago_pagoEfectivo', 'ordenPago_pagoEfectivo.pagoEfectivo'],
    });

    if (ordenes.length === 0) {
      console.log(`No se encontró una orden con ID ${orderId.id}`);
      return null;
    }

const pagos = ordenes.flatMap((orden) => {
  const tipoPago = orden.ordenPago_pagoEfectivo.length > 0 ? 'efectivo' :
                   orden.pagoElectronico ? 'electrónico' :
                   orden.zelle ? 'zelle' :
                   orden.montoBs_Dolares ? 'bsf' : null;

  const pagoEfectivoArray = orden.ordenPago_pagoEfectivo.reduce((acc, ordenPago_pagoEfectivo) => {
    const pagoEfectivo = ordenPago_pagoEfectivo.pagoEfectivo;

     let monto_total = "";

    if(pagoEfectivo.tipo_pago === "USD"){
       monto_total = orden.monto
    } else {

       monto_total = orden.monto
    }
 
    if (pagoEfectivo && orden.fecha_historial === orden.fecha_historial) {
      acc.push({
        pagoEfectivo,
        fecha_historial: orden.fecha_historial,
        monto: monto_total,
        fecha_historial_bsf: orden.montoBs_Dolares.fecha_historial,
        monto_bsf: orden.montoBs_Dolares.monto,
      });
    }
    return acc;
  }, []);

  const pagoElectronico = orden.pagoElectronico
    ? {
        numero_referencia: orden.pagoElectronico.numero_referencia,
        tipo_electronico: orden.pagoElectronico.tipo_pago,
        fecha_historial: orden.fecha_historial,
        monto: orden.monto,
        fecha_historial_bsf: orden.montoBs_Dolares.fecha_historial,
        monto_bsf: orden.montoBs_Dolares.monto,
      }
    : null;

  const zelle = orden.zelle
    ? {
        correo: orden.zelle.correo_electronico,
        fecha_historial: orden.fecha_historial,
        monto: orden.monto,
        fecha_historial_bsf: orden.montoBs_Dolares.fecha_historial,
        monto_bsf: orden.montoBs_Dolares.monto,
     
      }
    : null;

  const montoBsDolares = orden.montoBs_Dolares
    ? {
        fecha_historial: orden.montoBs_Dolares.fecha_historial,
        monto: orden.monto,
      }
    : null;

  return {
    tipo_pago: tipoPago,
    fecha_historial: orden.fecha_historial,
    fecha_historial_bsf: orden.montoBs_Dolares.fecha_historial,
    monto_bsf: orden.montoBs_Dolares.monto,
    monto_total: orden.monto,
    monto_total_dolares: orden.monto_dolares,
    pagoElectronico: pagoElectronico,
    pagoEfectivo: tipoPago === 'efectivo' ? pagoEfectivoArray : null,
    zelle: tipoPago === 'zelle' ? zelle : null,
    montoBsDolares: tipoPago === 'bsf' ? montoBsDolares : null,
  };
});
    return pagos;
  } catch (error) {
    console.log(`Error al obtener los pagos de la orden ${orderId.id}`, error);
    throw error;
  }
}





  async createMontoBS(montoBs: montoBsDto): Promise<any> {
    const montoBs_Dolares = new montoBs_DolaresEntity();
    montoBs_Dolares.montobs_dolares_id = new UniqueId().getId();

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Añadimos 1 porque los meses empiezan desde 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    montoBs_Dolares.fecha_historial = formattedDate
    montoBs_Dolares.monto = montoBs.monto

    await this.montoBsRepository.save(montoBs_Dolares);


    return {};
  }


  async getAllMontoBS(): Promise<montoBsDto[]> {
  const montos = await this.montoBsRepository.find();
  const lastDate = montos.reduce((prev, current) => {
    const prevDate = new Date(prev.fecha_historial);
    const currentDate = new Date(current.fecha_historial);
    return prevDate > currentDate ? prev : current;
  }).fecha_historial;
  const lastMontos = montos.filter(monto => monto.fecha_historial === lastDate);
  return lastMontos.map(monto => ({ monto: monto.monto, fecha_historial: monto.fecha_historial }));
}
}
