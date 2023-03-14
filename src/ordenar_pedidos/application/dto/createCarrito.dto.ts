import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { createProductoDto } from '../../../producto_combo/application/dto/createProducto.dto';
import { readIngredienteDto } from '../../../producto_combo/application/dto/readingrediente.dto';

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