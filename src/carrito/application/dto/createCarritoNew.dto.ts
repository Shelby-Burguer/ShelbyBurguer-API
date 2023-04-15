import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { IngredienteCarritoDto } from './ingredientesCarrito.dto';

@Exclude()
export class createNewCarritoDto {

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