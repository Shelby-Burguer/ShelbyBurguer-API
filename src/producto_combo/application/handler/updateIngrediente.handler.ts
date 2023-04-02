import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ingredienteService } from '../service/ingrediente.service';
import { updateIngredientelDto } from '../dto/updateIngrediente.dto';
import { ingrediente } from '../../domain/models/ingrediente';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { updateIngredientecommand } from '../../infraestructure/command/updateIngrediente.command';

@CommandHandler(updateIngredientecommand)
export class updateIngredienteHandler
  implements ICommandHandler<updateIngredientecommand>
{
  constructor(
    private readonly _ingredienteService: ingredienteService,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async execute({
    updateIngredienteRequest,
    idIngredienteRequest,
  }: updateIngredientecommand): Promise<updateIngredientelDto> {
    const collection: ingrediente =
      await this._ingredienteService.updateingrediente(
        this._mapper.updateDtotoDomain(
          idIngredienteRequest,
          updateIngredienteRequest,
        ),
      );
    return this._mapper.toDto(collection);
  }
}
