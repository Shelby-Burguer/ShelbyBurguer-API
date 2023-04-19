import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { createProductoDto } from './createProducto.dto';
import { readIngredienteDto } from './readingrediente.dto';

@Exclude()
export class createIgdtPdtDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  cantidad: string;

  @Expose()
  @IsString()
  precio: string;

  @Expose()
  @IsString()
  ingrediente_id: string;

  @Expose()
  @IsString()
  producto_id: string;

  @Expose()
  ingrediente: readIngredienteDto;

  @Expose()
  producto: createProductoDto;

  @Expose()
  @IsString()
  proteina: string;
}
