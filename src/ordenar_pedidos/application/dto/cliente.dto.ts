import { IsString, IsNotEmpty } from 'class-validator';
import { LugarDto } from './lugar.dto';

export class ClienteDTO {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly cedula: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly apellido: string;

  @IsNotEmpty()
  @IsString()
  readonly telefono: string;

  @IsString()
  readonly id_lugar: string;

  readonly lugar: LugarDto;
}
