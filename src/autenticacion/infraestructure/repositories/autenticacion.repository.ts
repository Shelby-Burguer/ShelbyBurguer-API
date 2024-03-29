import { userDto } from 'src/autenticacion/application/dto/user.dto';
import { createOrdenIdDto } from '../../../orden/application/dto/createOrdenId.dto';
import { credencialesDto } from 'src/autenticacion/application/dto/credenciales.dto';
import { createUserDto } from 'src/autenticacion/application/dto/createUser.dto';
import { recoveryKeyQDto } from 'src/autenticacion/application/dto/recoveryKey.dto';
import { recoveryKeyEDto } from 'src/autenticacion/application/dto/recoveryKeyE.dto';

export interface iAutenticacionRepository {
  createUser(user: createUserDto): Promise<any[]>;
  authenticateUser(credenciales:credencialesDto): Promise<any>;
  validateUser(credenciales: string): Promise<any>;
  recoveryKeyQUser(credenciales: recoveryKeyQDto): Promise<any>;
  recoveryKeyEUser(credenciales: recoveryKeyEDto): Promise<any>;
}