import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ingredienteService } from '../service/ingrediente.service';
import { readIngredienteDto } from '../dto/readIngrediente.dto';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { createProductocommand } from '../../infraestructure/command/createProducto.command';
import { ingrediente } from 'src/producto_combo/domain/models/ingrediente';
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
