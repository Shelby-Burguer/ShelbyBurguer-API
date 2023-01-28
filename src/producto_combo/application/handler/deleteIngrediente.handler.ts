import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ingredienteService } from '../service/ingrediente.service';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { deleteingredientecommand } from '../../infraestructure/command/deleteIngrediente.comand';

@CommandHandler(deleteingredientecommand)
export class deleteIngredientetHandler
  implements ICommandHandler<deleteingredientecommand>
{
  constructor(
    private readonly _ingredienteService: ingredienteService,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async execute({
    idIngredienteRequest,
  }: deleteingredientecommand): Promise<any> {
    const ingrediente = await this._ingredienteService.deleteIngrediente(
      this._mapper.deleteDtotoDomain(idIngredienteRequest),
    );
    return this._mapper.todeleteDto(ingrediente);
  }
}
