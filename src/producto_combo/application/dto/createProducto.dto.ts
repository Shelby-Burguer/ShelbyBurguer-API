import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class createProductoDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  nombre: string;

  @Expose()
  @IsString()
  tipo: string;

  @Expose()
  @IsString()
  costo: string;

  @Expose()
  @IsString()
  imagen: string;
  
  @Expose()
  @IsString()
  cantidad: number;

}
