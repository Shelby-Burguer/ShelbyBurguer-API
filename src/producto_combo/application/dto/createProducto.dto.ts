import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

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
}
