import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';

export class OneIngredienteQuery {
  constructor(public readonly idIngredienteRequest: idIngredienteDto) {}
}
