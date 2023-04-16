import { IsString, IsNotEmpty } from 'class-validator';


export class recoveryKeyEDto {

  @IsNotEmpty()
  @IsString()
  readonly respuestaPregunta_users: string;

  @IsNotEmpty()
  @IsString()
  readonly correo_user: string;

} 