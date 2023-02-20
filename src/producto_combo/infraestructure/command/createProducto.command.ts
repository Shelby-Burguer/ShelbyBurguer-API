import { createProductoDto } from '../../application/dto/createProducto.dto';

export class createProductocommand {
  constructor(public createProductoRequest: createProductoDto) {}
}
