import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { allIngredienteQuery } from '../../infraestructure/queryBus/allIngredientesQuery';
import { collectionService } from '../service/collection.service';
import { ingrediente } from '../../domain/models/ingrediente';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';

@QueryHandler(allIngredienteQuery)
export class allIngredienteHandler
  implements IQueryHandler<allIngredienteQuery>
{
  constructor(
    private readonly _collectionService: collectionService,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async execute(): Promise<any> {
    const ingrediente: ingrediente[] =
      await this._ingredienteService.getAllIngrediente();
    return ingrediente.map((coll: ingrediente) => this._mapper.toDto(coll));
  }
}
