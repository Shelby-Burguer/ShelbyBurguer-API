import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { createProductocommand } from '../../infraestructure/command/createProducto.command';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { productoService } from '../service/producto.service';
import { createProductoDto } from '../dto/createProducto.dto';
import { productoDataMapper } from '../../domain/mappers/producto.mapper';
import { createIgdtPdtcommand } from '../../infraestructure/command/createIgdtPdt.command';
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';
import { igdtPdtService } from '../service/IgdtPdt.servicer';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';
import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';

@CommandHandler(createIgdtPdtcommand)
export class createIgdtPdtHandler
  implements ICommandHandler<createIgdtPdtcommand>
{
  constructor(
    private readonly _productoService: igdtPdtService,
    private readonly _mapper: igdtPdtDataMapper,
  ) {}

  async execute({
    createIgdtPdtRequest,
  }: createIgdtPdtcommand): Promise<any> {
    const igdtPdt =
      await this._productoService.createIgdtPdt(createIgdtPdtRequest)
      
    return igdtPdt;
  }
}
