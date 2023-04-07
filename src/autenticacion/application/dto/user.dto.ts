import { IsString, IsNotEmpty } from 'class-validator';


export class userDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre_user: string;

  @IsNotEmpty()
  @IsString()
  readonly email_user: string;

  @IsNotEmpty()
  @IsString()
  readonly password_user: string;

}