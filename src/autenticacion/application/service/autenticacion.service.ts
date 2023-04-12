import { Inject, Injectable } from '@nestjs/common';
import { iAutenticacionRepository } from 'src/autenticacion/infraestructure/repositories/autenticacion.repository';
import { userDto } from '../dto/user.dto';
import { credencialesDto } from '../dto/credenciales.dto';
import { createUserDto } from '../dto/createUser.dto';

@Injectable()
export class autenticacionService {
  constructor(
    @Inject('iAutenticacionRepository')
    private readonly iAutenticacion: iAutenticacionRepository,
  ) {}



  async authenticateUser(credenciales: credencialesDto): Promise<string> {
    const user = await this.iAutenticacion.authenticateUser(credenciales);

    return user ;

  }

  async validateUser(credenciales: string): Promise<any> {
    const validate = await this.iAutenticacion.validateUser(credenciales);
    return validate ;
  }

  async createNewUser(credenciales: createUserDto): Promise<any> {
    const user = await this.iAutenticacion.createUser(credenciales);

    return user ;

  }

}




