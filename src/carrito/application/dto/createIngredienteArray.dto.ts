import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IngredienteCarritoDto } from './ingredientesCarrito.dto';
import { createNewCarritoDto } from './createCarritoNew.dto';
import { IngredienteRproductoDto } from './ingredienteResproducto.dto';

@Exclude()
export class createingredieteArrayDto {

  @Expose()
  @IsString()
  productos: createNewCarritoDto[];
  

  @Expose()
  @IsString()
  ingrediente_id: IngredienteRproductoDto[];

}