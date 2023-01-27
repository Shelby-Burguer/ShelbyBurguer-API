import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class readIngredienteDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  nombre: string;

  @Expose()
  @IsString()
  unidad: string;
}
