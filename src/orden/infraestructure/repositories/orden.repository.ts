import { OrdenDto } from '../../application/dto/orden.dto';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';

export interface iOrdenRepository {
  createOrdenId(): Promise<any[]>;
  getProductsByOrderId(orderId: createOrdenIdDto): Promise<any[]>;
  getOrderId(orderId: createOrdenIdDto): Promise<any[]>;
  procesarOrdenId(orderId: createOrdenIdDto, orden: OrdenDto): Promise<any>;
  deleteOrderId(orderId: createOrdenIdDto): Promise<any>;
  obtenerTodasLasOrdenesConDetalle(): Promise<any[]>
  getEstados(): Promise<any[]>
}
