import { createCarritoDto } from 'src/ordenar_pedidos/application/dto/createCarrito.dto';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';

export interface iCarritoRepository {
  getAllCarrito(): Promise<any[]>;
  createCarrito(carrito: createCarritoDto): Promise<any[]>;
  deleteCarrito(): Promise<any[]>;
  deleteProductoCarrito(producto: createCarritoDto): Promise<any[]>;
}
