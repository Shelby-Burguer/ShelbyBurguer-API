import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { updateIngredientelDto } from '../../application/dto/updateIngrediente.dto';

export class updateIngredientecommand {
  constructor(
    public readonly updateIngredienteRequest: updateIngredientelDto,
    public readonly idIngredienteRequest: idIngredienteDto,
  ) {}
}
