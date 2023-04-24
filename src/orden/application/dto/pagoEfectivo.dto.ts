import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class pagoEfectivoDto{
  @Expose()
  @IsString()
  dolares_efectivo_id: string;

  @Expose()
  @IsString()
  serialNumber: string;

  @Expose()
  @IsString()
  denomination: string;

  @Expose()
  @IsString()
  cantidadBilletes: string;

  @Expose()
  @IsString()
  fecha_pago: string;
  
  @Expose()
  @IsString()
  currency: string;

  @Expose()
  @IsString()
  monto: string;

}