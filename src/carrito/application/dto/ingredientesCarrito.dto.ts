import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class IngredienteCarritoDto {

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  cantidad: string;
 
}