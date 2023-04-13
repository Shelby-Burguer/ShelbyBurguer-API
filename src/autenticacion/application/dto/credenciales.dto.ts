import { IsString, IsNotEmpty } from 'class-validator';


export class credencialesDto {
  @IsNotEmpty()
  @IsString()
  readonly email_user: string;

  @IsNotEmpty()
  @IsString()
  readonly password_user: string;

} 