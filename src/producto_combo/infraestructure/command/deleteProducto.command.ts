import { createProductoDto } from 'src/producto_combo/application/dto/createProducto.dto';

export class deleteProductocommand {
  constructor(public readonly idProductoRequest: createProductoDto)  {}
}