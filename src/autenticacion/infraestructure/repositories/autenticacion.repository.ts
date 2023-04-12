import { userDto } from 'src/autenticacion/application/dto/user.dto';
import { createOrdenIdDto } from '../../../orden/application/dto/createOrdenId.dto';
import { credencialesDto } from 'src/autenticacion/application/dto/credenciales.dto';
import { createUserDto } from 'src/autenticacion/application/dto/createUser.dto';

export interface iAutenticacionRepository {
  createUser(user: createUserDto): Promise<any[]>;
  authenticateUser(credenciales:credencialesDto): Promise<any>;
  validateUser(credenciales: string): Promise<any>;
}