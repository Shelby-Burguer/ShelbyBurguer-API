import { createProductoDto } from '../../application/dto/createProducto.dto';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { updateIngredientelDto } from '../../application/dto/updateIngrediente.dto';

export class updateproductocommand {
  constructor(public readonly updateProductoRequest: createProductoDto, public readonly idProductoRequest: createProductoDto)  {}
}
