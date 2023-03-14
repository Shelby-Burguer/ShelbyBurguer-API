import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { createComboDto } from '../dto/createCombo.dto';
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';
import { createProductoDto } from '../dto/createProducto.dto';

export interface icomboRepository {
  getAllCombo(): Promise<any[]>;
  createCombo(combo: createComboDto): Promise<any[]>;
  deleteCombo(combo: createComboDto): Promise<any[]>;
}
