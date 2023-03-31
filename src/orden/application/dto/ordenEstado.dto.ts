import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ordenEstadoDto {
  @Expose()
  @IsString()
  orden_id: string;

  @Expose()
  @IsString()
  estado_id: string;


}
