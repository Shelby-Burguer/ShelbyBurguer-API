import { IsString, IsNotEmpty } from 'class-validator';


export class createUserDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre_user: string;

  @IsNotEmpty()
  @IsString()
  readonly apellido_users: string;

  @IsNotEmpty()
  @IsString()
  readonly cedula_users: string;
  
  @IsNotEmpty()
  @IsString()
  readonly telefono_users: string;

  @IsNotEmpty()
  @IsString()
  readonly direccion_users: string;

  @IsNotEmpty()
  @IsString()
  readonly fecha_inicio_users: string;

  @IsNotEmpty()
  @IsString()
  readonly correo_user: string;

  @IsNotEmpty()
  @IsString()
  readonly contraseña_user: string;

  @IsNotEmpty()
  @IsString()
  readonly rol_user: string;

  @IsNotEmpty()
  @IsString()
  readonly preguntaSecreta_users: string;

  @IsNotEmpty()
  @IsString()
  readonly respuestaPregunta_users: string;

} 