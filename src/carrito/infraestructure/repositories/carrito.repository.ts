import { createCarritoDto } from '../../application/dto/createCarrito.dto';
import { createOrdenIdDto } from '../../../orden/application/dto/createOrdenId.dto';
import { createCarritoIngredienteDto } from 'src/carrito/application/dto/createCarritoIngrediente.dto';
import { createNewCarritoDto } from 'src/carrito/application/dto/createCarritoNew.dto';
import { createingredieteArrayDto } from 'src/carrito/application/dto/createIngredienteArray.dto';

export interface iCarritoRepository {
  getAllCarrito(): Promise<any[]>;
  createCarrito(carrito: createCarritoDto): Promise<any[]>;
  createProductoOrdenes(carrito: createingredieteArrayDto): Promise<any[]>;
  deleteCarrito(): Promise<any[]>;
  deleteProductoCarrito(producto: createNewCarritoDto): Promise<any[]>;
  createCarritoIngrediente(carrito: createCarritoIngredienteDto): Promise<any[]>;
  getAllCarritoIngrediente(): Promise<any[]>;
}
