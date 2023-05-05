import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class accionUserDto{

  @Expose()
  @IsString()
  nombre_accion: string;

  @Expose()
  @IsString()
  nombre_user: string;

  @Expose()
  @IsString()
  role_user: string;

  @Expose()
  @IsString()
  orden_id: string;

}