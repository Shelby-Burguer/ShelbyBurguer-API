import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ordenIdDto{

  @Expose()
  @IsString()
  id: string;

}