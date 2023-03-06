import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ingredienteService } from '../service/ingrediente.service';
import { updateIngredientelDto } from '../dto/updateIngrediente.dto';
import { ingrediente } from '../../domain/models/ingrediente';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { updateIngredientecommand } from '../../infraestructure/command/updateIngrediente.command';
import { updateproductocommand } from '../../infraestructure/command/updateProducto.command';
import { productoService } from '../service/producto.service';
import { productoDataMapper } from '../../domain/mappers/producto.mapper';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { createProductoDto } from '../dto/createProducto.dto';

@CommandHandler(updateproductocommand)
export class updateProductoHandler
  implements ICommandHandler<updateproductocommand>
{
  constructor(
    private readonly _productoService: productoService,
    private readonly _mapper: productoDataMapper,
  ) {}

  async execute({
    updateProductoRequest, idProductoRequest
  }: updateproductocommand): Promise<createProductoDto> {
    const producto: productoEntity =
      await this._productoService.updateProducto(
        this._mapper.updateEntity(updateProductoRequest,idProductoRequest),
      );
    return this._mapper.toDto(producto);
  }
}