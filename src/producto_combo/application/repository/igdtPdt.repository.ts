import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';

export interface iIgdtPdtRepository {
 getAllIgdtPdt(): Promise<igdt_pdtEntity[]>;
 getOneIngrediente(_ingrediente: ingredienteEntity): Promise<ingredienteEntity>;
 createIgdtPdt(_igdtPdt: igdt_pdtEntity): Promise<igdt_pdtEntity>;
 createImagenIngrediente(_ingrediente: ingredienteEntity): Promise<ingredienteEntity>;
 updateProducto(_producto: productoEntity): Promise<productoEntity>;
 deleteProducto(_ingrediente: productoEntity): Promise<string>
}
