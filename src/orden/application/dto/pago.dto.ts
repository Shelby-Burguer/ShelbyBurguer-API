import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { pagoEfectivoDto } from './pagoEfectivo.dto';
import { pagoElectronicoDto } from './pagoElectronico.dto';
import { zelleDto } from './zelle.dto';

@Exclude()
export class pagoDto {
  @Expose()
  @IsString()
  tipo_pago: string;

  @Expose()
  @IsString()
  monto: string;
  
  @Expose()
  pagoElectronico: pagoElectronicoDto;

  @Expose()
  pagoEfectivo: pagoEfectivoDto;

  @Expose()
  zelle: zelleDto;

}
