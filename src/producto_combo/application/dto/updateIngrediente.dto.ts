import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class updateIngredientelDto {
  @Expose()
  @IsString()
  nombre: string;

  @Expose()
  @IsString()
  unidad: string;

  @Expose()
  @IsString()
  proteina: string;

  @Expose()
  @IsString()
  extra: string;

}
