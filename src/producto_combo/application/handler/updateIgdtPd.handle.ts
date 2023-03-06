import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { createIgdtPdtcommand } from '../../infraestructure/command/createIgdtPdt.command';
import { igdtPdtService } from '../service/IgdtPdt.servicer';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';
import { updateIgdtPdtcommand } from '../../infraestructure/command/updateIgdtpdt.command';


@CommandHandler(updateIgdtPdtcommand)
export class updateIgdtPdtHandler
  implements ICommandHandler<updateIgdtPdtcommand>
{
  constructor(
    private readonly _productoService: igdtPdtService,
    private readonly _mapper: igdtPdtDataMapper,
  ) {}

  async execute({
    updateProductoRequest,
    updateIgdtPdtRequest,
  }: updateIgdtPdtcommand) {
  console.log('Handler update', updateProductoRequest, updateIgdtPdtRequest)
    const igdtPdt =
      await this._productoService.updateIgdtPdt(updateProductoRequest, updateIgdtPdtRequest)
      
    return igdtPdt;
  }
}