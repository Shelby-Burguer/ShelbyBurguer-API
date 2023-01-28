import { createIngredienteDto } from '../../application/dto/createIngrediente.dto';

export class createIngredientecommand {
  constructor(public createIngredienteRequest: createIngredienteDto) {}
}
