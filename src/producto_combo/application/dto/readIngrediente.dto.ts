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

  @Expose()
  @IsString()
  objectURL: string;

  @Expose()
  @IsString()
  nombreImagen: string;

  @Expose()
  @IsString()
  datosImagen: Uint8Array;

  @Expose()
  @IsString()
  proteina: string;

  @Expose()
  @IsString()
  extra: string;
}
