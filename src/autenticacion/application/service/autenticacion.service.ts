import { Inject, Injectable } from '@nestjs/common';
import { iAutenticacionRepository } from 'src/autenticacion/infraestructure/repositories/autenticacion.repository';
import { userDto } from '../dto/user.dto';



@Injectable()
export class autenticacionService {
  constructor(
    @Inject('iAutenticacionRepository')
    private readonly iAutenticacion: iAutenticacionRepository,
  ) {}

  async createUser(user: userDto): Promise<any> {
    const users = await this.iAutenticacion.createUser(user)
  }

  async authenticateUser(credenciales: { email: string, password: string }): Promise<string> {
    const user = await this.iAutenticacion.authenticateUser(credenciales);

    return ;
  }
}




