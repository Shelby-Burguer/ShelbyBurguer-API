import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { createImagenIngredienteDto } from '../../application/dto/createImagenIngrediente.dto';

export class createImagenIngredientecommand {
  constructor(public readonly createImagenIngredienteRequest: createImagenIngredienteDto, public readonly idIngredienteRequest: idIngredienteDto) {}
}
