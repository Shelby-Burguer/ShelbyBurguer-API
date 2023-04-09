import { userDto } from 'src/autenticacion/application/dto/user.dto';
import { createOrdenIdDto } from '../../../orden/application/dto/createOrdenId.dto';
import { credencialesDto } from 'src/autenticacion/application/dto/credenciales.dto';

export interface iAutenticacionRepository {
  createUser(user: userDto): Promise<any[]>;
  authenticateUser(credenciales:credencialesDto): Promise<any>;

}