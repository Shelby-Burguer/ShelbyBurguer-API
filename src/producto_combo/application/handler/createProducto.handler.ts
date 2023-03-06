import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { createProductocommand } from '../../infraestructure/command/createProducto.command';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { productoService } from '../service/producto.service';
import { createProductoDto } from '../dto/createProducto.dto';
import { productoDataMapper } from '../../domain/mappers/producto.mapper';

@CommandHandler(createProductocommand)
export class createProductoHandler
  implements ICommandHandler<createProductocommand>
{
  constructor(
    private readonly _productoService: productoService,
    private readonly _mapper: productoDataMapper,
  ) {}

  async execute({
    createProductoRequest,
  }: createProductocommand): Promise<createProductoDto> {
    const producto: productoEntity =
      await this._productoService.createProducto(createProductoRequest);
    
    return this._mapper.toDto(producto);
  }
}
