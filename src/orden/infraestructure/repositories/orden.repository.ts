import { OrdenDto } from '../../application/dto/orden.dto';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';
import { ordenEstadoDto } from 'src/orden/application/dto/ordenEstado.dto';
import { pagoDto } from 'src/orden/application/dto/pago.dto';

export interface iOrdenRepository {
  createOrdenId(): Promise<any[]>;
  getProductsByOrderId(orderId: createOrdenIdDto): Promise<any[]>;
  getOrderId(orderId: createOrdenIdDto): Promise<any[]>;
  procesarOrdenId(orderId: createOrdenIdDto, orden: OrdenDto): Promise<any>;
  deleteOrderId(orderId: createOrdenIdDto): Promise<any>;
  obtenerTodasLasOrdenesConDetalle(): Promise<any[]>;
  getEstados(): Promise<any[]>;
  createOrdenEstado(estadoOrden: ordenEstadoDto): Promise<any[]>;
  createOrdenPago(orderId: createOrdenIdDto, pago: pagoDto): Promise<any[]>;
  getAllPagos(orderId: createOrdenIdDto): Promise<any[]>;
}
