import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { createIgdtPdtDto } from './createIgdtPdt.dto';
import { createProductoDto } from './createProducto.dto';
import { readIngredienteDto } from './readingrediente.dto';

@Exclude()
export class updateIgdtPdtDto {

  @Expose()
  producto: createProductoDto;

  @Expose()
  updateIgdtPdt: createIgdtPdtDto[];

}