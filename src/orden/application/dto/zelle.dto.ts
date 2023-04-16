import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class zelleDto{
  @Expose()
  @IsString()
  zelle_id: string;

  @Expose()
  @IsString()
  correo_electronico: string;

  @Expose()
  @IsString()
  fecha_zelle: string;
  
}