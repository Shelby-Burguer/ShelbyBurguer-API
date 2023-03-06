import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ingredienteService } from '../service/ingrediente.service';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { deleteingredientecommand } from '../../infraestructure/command/deleteIngrediente.comand';
import { deleteProductocommand } from '../../infraestructure/command/deleteProducto.command';
import { productoService } from '../service/producto.service';

@CommandHandler(deleteProductocommand)
export class deleteProductotHandler
  implements ICommandHandler<deleteProductocommand>
{
  constructor(
    private readonly _productoService: productoService,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async execute({
    idProductoRequest,
  }: deleteProductocommand): Promise<any> {
    const producto = await this._productoService.deleteProducto(idProductoRequest);

    return producto;
  }
}
