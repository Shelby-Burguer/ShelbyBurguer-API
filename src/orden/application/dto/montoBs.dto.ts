import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class montoBsDto{

  @Expose()
  @IsString()
  monto: string;

}