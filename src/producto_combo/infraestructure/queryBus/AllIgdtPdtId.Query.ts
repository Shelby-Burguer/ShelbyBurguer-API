import { createIgdtPdtDto } from '../../application/dto/createIgdtPdt.dto';

export class AllIgdtPdtIdQuery {
  constructor(public readonly idProductoRequest: createIgdtPdtDto)  {}
}
