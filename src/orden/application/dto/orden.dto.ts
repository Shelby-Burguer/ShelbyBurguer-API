import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class OrdenDto {
  @Expose()
  @IsString()
  orden_id: string;

  @Expose()
  @IsString()
  fecha_orden: string;

  @Expose()
  @IsString()
  hora_orden: string;

  @Expose()
  @IsString()
  numero_mesa: string;

  @Expose()
  @IsString()
  descuento: string;

  @Expose()
  @IsString()
  tipo_orden: string;

  @Expose()
  @IsString()
  numero_orden: string;

  @Expose()
  @IsString()
  lugar_id: string;

  @Expose()
  @IsString()
  cliente_id: string;

  @Expose()
  @IsString()
  direccion: string;

}
