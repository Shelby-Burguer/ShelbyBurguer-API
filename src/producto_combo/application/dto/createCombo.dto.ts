import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { createProductoDto } from './createProducto.dto';
import { readIngredienteDto } from './readingrediente.dto';

@Exclude()
export class createComboDto {

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  nombre: string;

  @Expose()
  @IsString()
  precio_unitario: string;

  @Expose()
  @IsNumber()
  tiempo_aprox: string;

  @Expose()
  producto: createProductoDto[];

}