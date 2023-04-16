import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class pagoElectronicoDto {
  @Expose()
  @IsString()
  pago_id: string;

  @Expose()
  @IsString()
  numero_referencia: string;

  @Expose()
  @IsString()
  fecha_pago_movil: string;

  @Expose()
  @IsString()
  tipo_pago: string;

}
