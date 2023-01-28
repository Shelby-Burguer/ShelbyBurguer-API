import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class idIngredienteDto {
  @Expose()
  @IsString()
  id: string;
}
