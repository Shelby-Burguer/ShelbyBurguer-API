import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { allIngredienteQuery } from '../../infraestructure/queryBus/allIngredientesQuery';
import { ingredienteService } from '../service/ingrediente.service';
import { ingrediente } from '../../domain/models/ingrediente';
import { allProductoQuery } from '../../infraestructure/queryBus/allProductoQuery';
import { productoService } from '../service/producto.service';
import { productoDataMapper } from '../../domain/mappers/producto.mapper';
import { createProductoDto } from '../dto/createProducto.dto';
import { productoEntity } from '../../infraestructure/orm/producto.orm';

@QueryHandler(allProductoQuery)
export class allProductoHandler
  implements IQueryHandler<allProductoQuery>
{
  constructor(
    private readonly _productoService: productoService,
    private readonly _mapper: productoDataMapper,
  ) {}

  async execute(): Promise<createProductoDto[]> {
    const producto: productoEntity[] =
      await this._productoService.getAllProducto();
    return producto.map((producto: productoEntity) => this._mapper.toDto(producto));
  }
}
