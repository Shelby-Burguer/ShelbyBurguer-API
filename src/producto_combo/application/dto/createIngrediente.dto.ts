import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class createIngredienteDto {
  @Expose()
  @IsString()
  nombre: string;

  @Expose()
  @IsString()
  unidad: string;
}