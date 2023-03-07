import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AllIgdtPdtIdQuery } from '../../infraestructure/queryBus/AllIgdtPdtId.Query';
import { igdtPdtService } from '../service/IgdtPdt.servicer';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';
import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';

@QueryHandler(AllIgdtPdtIdQuery)
export class IgdtPdtIdHandler implements IQueryHandler<AllIgdtPdtIdQuery> {
  constructor(
    private readonly _igdtPdtService: igdtPdtService,
    private readonly _mapper: igdtPdtDataMapper,
  ) {}

  async execute({ idProductoRequest }: AllIgdtPdtIdQuery): Promise<any> {
    console.log(idProductoRequest);
    const igdt_pdt: igdt_pdtEntity[] =
      await this._igdtPdtService.getAllIgdtPdtid(idProductoRequest);

    const res: createIgdtPdtDto[] = igdt_pdt.map((data: igdt_pdtEntity) =>
      this._mapper.toDto(data),
    );
    return res;
  }
}
