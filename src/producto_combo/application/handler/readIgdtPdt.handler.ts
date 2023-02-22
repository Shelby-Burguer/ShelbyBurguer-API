import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { allIngredienteQuery } from '../../infraestructure/queryBus/allIngredientesQuery';
import { ingredienteService } from '../service/ingrediente.service';
import { ingrediente } from '../../domain/models/ingrediente';
import { allProductoQuery } from '../../infraestructure/queryBus/allProductoQuery';
import { productoService } from '../service/producto.service';
import { productoDataMapper } from '../../domain/mappers/producto.mapper';
import { createProductoDto } from '../dto/createProducto.dto';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { allIgdtPdtQuery } from '../../infraestructure/queryBus/allIgdtPdt.Query';
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';
import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { igdtPdtService } from '../service/IgdtPdt.servicer';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';

@QueryHandler(allIgdtPdtQuery)
export class allIgdtPdtHandler
  implements IQueryHandler<allIgdtPdtQuery>
{
  constructor(
    private readonly _igdtPdtService: igdtPdtService,
    private readonly _mapper: igdtPdtDataMapper,
  ) {}

  async execute(): Promise<createIgdtPdtDto[]> {
    const igdtPdt: igdt_pdtEntity[] =
      await this._igdtPdtService.getAllIgdtPdt();
    return igdtPdt.map((igdtPdt: igdt_pdtEntity) => this._mapper.toDto(igdtPdt));
  }
}
