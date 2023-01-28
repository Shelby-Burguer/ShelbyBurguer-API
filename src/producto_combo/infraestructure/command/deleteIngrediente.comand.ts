import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';

export class deleteingredientecommand {
  constructor(public readonly idIngredienteRequest: idIngredienteDto)  {}
}