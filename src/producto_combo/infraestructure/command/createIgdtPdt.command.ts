import { createProductoDto } from '../../application/dto/createProducto.dto';
import { createIgdtPdtDto } from '../../application/dto/createIgdtPdt.dto';

export class createIgdtPdtcommand {
  constructor(public createIgdtPdtRequest: createIgdtPdtDto[]) {}
}
