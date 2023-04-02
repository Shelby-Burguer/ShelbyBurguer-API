import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OneIngredienteQuery } from '../../infraestructure/queryBus/oneIngrediente.Queryt';
import { ingredienteService } from '../service/ingrediente.service';
import { ingrediente } from '../../domain/models/ingrediente';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { readIngredienteDto } from '../dto/readIngrediente.dto';

@QueryHandler(OneIngredienteQuery)
export class OneIngredienteHandler
  implements IQueryHandler<OneIngredienteQuery>
{
  constructor(
    private readonly _ingredienteService: ingredienteService,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async execute({
    idIngredienteRequest,
  }: OneIngredienteQuery): Promise<readIngredienteDto> {
    const ingrediente: ingrediente =
      await this._ingredienteService.getOneIngrediente(
        this._mapper.toDomainFromDtoid(idIngredienteRequest),
      );
    return this._mapper.toDto(ingrediente);
  }
}
