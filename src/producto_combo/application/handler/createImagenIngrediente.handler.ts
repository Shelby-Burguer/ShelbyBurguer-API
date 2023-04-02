import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ingredienteService } from '../service/ingrediente.service';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { createImagenIngredientecommand } from '../../infraestructure/command/createImage.command';
import { createImagenIngredienteDto } from '../dto/createImagenIngrediente.dto';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';

@CommandHandler(createImagenIngredientecommand)
export class createImagenIngredientetHandler
  implements ICommandHandler<createImagenIngredientecommand>
{
  constructor(
    private readonly _ingredienteService: ingredienteService,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async execute({
    createImagenIngredienteRequest,
    idIngredienteRequest,
  }: createImagenIngredientecommand): Promise<createImagenIngredienteDto> {
    const ingrediente: ingredienteEntity =
      await this._ingredienteService.createImagenIngrediente(
        createImagenIngredienteRequest,
        idIngredienteRequest,
      );

    return this._mapper.toDtoImagen(ingrediente);
  }
}
