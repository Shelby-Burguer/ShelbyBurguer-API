import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class pagoEfectivoDto{
  @Expose()
  @IsString()
  dolares_efectivo_id: string;

  @Expose()
  @IsString()
  numero_serie: string;

  @Expose()
  @IsString()
  denominacion: string;

  @Expose()
  @IsString()
  cantidad_billetes: string;

  @Expose()
  @IsString()
  fecha_pago: string;
  
  @Expose()
  @IsString()
  tipo_pago: string;

}