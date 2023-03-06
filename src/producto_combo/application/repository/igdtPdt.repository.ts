import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';
import { createProductoDto } from '../dto/createProducto.dto';

export interface iIgdtPdtRepository {
 getAllIgdtPdt(): Promise<igdt_pdtEntity[]>;
 getAllIgdtPdtid(_ingrediente: igdt_pdtEntity): Promise<igdt_pdtEntity[]>;
 createIgdtPdt(_igdtPdt: igdt_pdtEntity): Promise<string>;
 createImagenIngrediente(_ingrediente: ingredienteEntity): Promise<ingredienteEntity>;
 updateIgdtPdt(productId: productoEntity, producto: productoEntity, _createIgdtPdtDto: createIgdtPdtDto[]);
 deleteProducto(_ingrediente: productoEntity): Promise<string>
}
