import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class createCarritoIngredienteDto {

  @Expose()
  @IsString()
  carrito_ingrediente_id: string;

  @Expose()
  @IsString()
  ingrediente_id: string;

  @Expose()
  @IsString()
  producto_id: string;
}