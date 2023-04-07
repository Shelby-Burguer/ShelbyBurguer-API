import { userDto } from 'src/autenticacion/application/dto/user.dto';
import { createOrdenIdDto } from '../../../orden/application/dto/createOrdenId.dto';

export interface iAutenticacionRepository {
  createUser(user: userDto): Promise<any[]>;
  authenticateUser(credenciales: { email: string, password: string }): Promise<any>;

}