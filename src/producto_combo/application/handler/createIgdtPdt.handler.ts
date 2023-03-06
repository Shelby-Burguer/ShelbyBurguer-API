import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { createIgdtPdtcommand } from '../../infraestructure/command/createIgdtPdt.command';
import { igdtPdtService } from '../service/IgdtPdt.servicer';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';


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
    console.log('Handler', createIgdtPdtRequest)
      await this._productoService.createIgdtPdt(createIgdtPdtRequest)
      
    return igdtPdt;
  }
}
