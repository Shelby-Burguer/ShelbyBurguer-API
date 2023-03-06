import { createProductoDto } from '../../application/dto/createProducto.dto';
import { createIgdtPdtDto } from '../../application/dto/createIgdtPdt.dto';
import { updateIgdtPdtDto } from 'src/producto_combo/application/dto/updateIgftPdt.dto';

export class updateIgdtPdtcommand {
  constructor(public readonly updateProductoRequest: createProductoDto, public updateIgdtPdtRequest: updateIgdtPdtDto) {}
}