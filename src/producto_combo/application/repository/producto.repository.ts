import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { productoEntity } from '../../infraestructure/orm/producto.orm';

export interface iProductoRepository {
 getAllIngrediente(): Promise<ingredienteEntity[]>;
 getOneIngrediente(_ingrediente: ingredienteEntity): Promise<ingredienteEntity>;
 createProducto(_producto: productoEntity): Promise<productoEntity>;
 createImagenIngrediente(_ingrediente: ingredienteEntity): Promise<ingredienteEntity>;
 updateIngrediente(_ingrediente: ingredienteEntity): Promise<ingredienteEntity>;
 deleteIngrediente(_ingrediente: ingredienteEntity): Promise<string>
}
