import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class LugarDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly tipo: string;

  @IsNumber()
  @IsOptional()
  readonly precio: number;
}
