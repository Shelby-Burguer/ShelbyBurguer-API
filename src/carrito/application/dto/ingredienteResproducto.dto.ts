import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class IngredienteRproductoDto {

  @Expose()
  @IsString()
  ingrediente_id: string;

  @Expose()
  @IsString()
  cantidad: string;
 
}