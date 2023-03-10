import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { productoEntity } from '../../infraestructure/orm/producto.orm';

export interface iProductoRepository {
  getAllProducto(): Promise<productoEntity[]>;
  getOneIngrediente(
    _ingrediente: ingredienteEntity,
  ): Promise<ingredienteEntity>;
  createProducto(_producto: productoEntity): Promise<productoEntity>;
  createImagenIngrediente(
    _ingrediente: ingredienteEntity,
  ): Promise<ingredienteEntity>;
  updateProducto(_producto: productoEntity): Promise<productoEntity>;
  deleteProducto(_ingrediente: productoEntity): Promise<string>;
}
