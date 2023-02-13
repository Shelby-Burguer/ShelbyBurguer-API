import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class createImagenIngredienteDto {
  
  @Expose()
  @IsString()
  nombreImagen: string;

  @Expose()
  @IsString()
  datosImagen: Uint8Array;
}