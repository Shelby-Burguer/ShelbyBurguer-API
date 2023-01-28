import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ingredienteService } from '../service/ingrediente.service';
import { readIngredienteDto } from '../dto/readIngrediente.dto';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { createIngredientecommand } from '../../infraestructure/command/createIngrediente.command';
import { ingrediente } from 'src/producto_combo/domain/models/ingrediente';

@CommandHandler(createIngredientecommand)
export class createIngredientetHandler
  implements ICommandHandler<createIngredientecommand>
{
  constructor(
    private readonly _ingredienteService: ingredienteService,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async execute({
    createIngredienteRequest,
  }: createIngredientecommand): Promise<readIngredienteDto> {
    const ingrediente: ingrediente =
      await this._ingredienteService.createIngrediente(
        this._mapper.toDomainFromDto(createIngredienteRequest),
      );
    return this._mapper.toDto(ingrediente);
  }
}
