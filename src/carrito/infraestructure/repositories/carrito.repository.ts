import { createCarritoDto } from '../../application/dto/createCarrito.dto';
import { createOrdenIdDto } from '../../../orden/application/dto/createOrdenId.dto';

export interface iCarritoRepository {
  getAllCarrito(): Promise<any[]>;
  createCarrito(carrito: createCarritoDto): Promise<any[]>;
  createProductoOrdenes(carrito: createCarritoDto[]): Promise<any[]>;
  deleteCarrito(): Promise<any[]>;
  deleteProductoCarrito(producto: createCarritoDto): Promise<any[]>;
}
