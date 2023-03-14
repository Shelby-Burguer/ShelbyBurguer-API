import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { createProductoDto } from '../../../producto_combo/application/dto/createProducto.dto';
import { readIngredienteDto } from '../../../producto_combo/application/dto/readingrediente.dto';

@Exclude()
export class createOrdenIdDto {
  @Expose()
  @IsString()
  id: string;
}
