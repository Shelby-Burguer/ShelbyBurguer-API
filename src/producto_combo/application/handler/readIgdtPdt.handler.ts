import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { allIgdtPdtQuery } from '../../infraestructure/queryBus/allIgdtPdt.Query';
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';
import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { igdtPdtService } from '../service/IgdtPdt.servicer';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';

@QueryHandler(allIgdtPdtQuery)
export class allIgdtPdtHandler implements IQueryHandler<allIgdtPdtQuery> {
  constructor(
    private readonly _igdtPdtService: igdtPdtService,
    private readonly _mapper: igdtPdtDataMapper,
  ) {}

  async execute(): Promise<createIgdtPdtDto[]> {
    const igdtPdt: igdt_pdtEntity[] =
      await this._igdtPdtService.getAllIgdtPdt();
    return igdtPdt.map((igdtPdt: igdt_pdtEntity) =>
      this._mapper.toDto(igdtPdt),
    );
  }
}
