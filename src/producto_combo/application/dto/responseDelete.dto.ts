import { Exclude, Expose } from 'class-transformer';
import {
  IsString,
  IsDefined,
  ValidateNested,
} from 'class-validator';

@Exclude()
export class responseDeleteIngredienteDto {
  @Expose()
  @IsString()
  responseDelete: string;
}