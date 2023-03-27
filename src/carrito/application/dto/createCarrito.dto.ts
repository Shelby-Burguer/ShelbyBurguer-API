import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class createCarritoDto {

  @Expose()
  @IsString()
  idCarrito: string;

  @Expose()
  @IsString()
  idProducto: string;

  @Expose()
  @IsString()
  idOrden: string;
}