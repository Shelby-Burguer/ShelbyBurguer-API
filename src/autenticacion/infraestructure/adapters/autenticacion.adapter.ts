import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { iAutenticacionRepository } from '../repositories/autenticacion.repository';
import { roleEntity } from '../entities/role.orm';
import { userEntity } from '../entities/user.orm';
import { userRoleEntity } from '../entities/userRole.orm';
import { userDto } from 'src/autenticacion/application/dto/user.dto';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { credencialesDto } from 'src/autenticacion/application/dto/credenciales.dto';
import { createUserDto } from 'src/autenticacion/application/dto/createUser.dto';
import { recoveryKeyQDto } from 'src/autenticacion/application/dto/recoveryKey.dto';
import { recoveryKeyEDto } from 'src/autenticacion/application/dto/recoveryKeyE.dto';

@Injectable()
export class autenticacionPersisteceAdapter implements iAutenticacionRepository {
  constructor(
    @InjectRepository(roleEntity)
    private readonly roleRepository: Repository<roleEntity>,
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
    @InjectRepository(userRoleEntity)
    private readonly userRoleRepository: Repository<userRoleEntity>,
  ) {}

  async createUser(_user: createUserDto): Promise<any> {
    const user = new userEntity();
    user.users_id = new UniqueId().getId();
    user.nombre_users = _user.nombre_user;
    user.apellido_users = _user.apellido_users;
    user.cedula_users = _user.cedula_users;
    user.telefono_users = _user.telefono_users;
    user.direccion_users = _user.direccion_users;
    user.fecha_inicio_users = _user.fecha_inicio_users;
    user.email_users = _user.correo_user;
    user.password_users = _user.contraseña_user;
    user.preguntasecreta_users = _user.preguntaSecreta_users;
    user.respuestapregunta_users = _user.respuestaPregunta_users;
    await this.userRepository.save(user);


    const role = await this.roleRepository.findOne({ where: { nombre_roles: _user.rol_user } });

    const userRole = new userRoleEntity();
    userRole.user_role_id = new UniqueId().getId();
    userRole.roles_id = role.roles_id;
    userRole.users_id = user.users_id;

    await this.userRoleRepository.save(userRole)
  
    return {};
  }

  async authenticateUser(credenciales: credencialesDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email_users: credenciales.email_user } });
   
    const roles = await this.userRoleRepository.findOne({
      where: { users_id: user.users_id },
      relations: ['role'],
  });
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    //const isPasswordValid = await compare(credenciales.password_user, user.password_users);
    if (credenciales.password_user !== user.password_users) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const token = sign({ userId: user.users_id, role: roles.role.nombre_roles }, 'secretKey', { expiresIn: '16h' });
    return {token: token, nombre_user: user.nombre_users, nombre_role: roles.role.nombre_roles};
  }

    async validateUser(credenciales: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { users_id: credenciales } });
    
    const roles = await this.userRoleRepository.findOne({
      where: { users_id: user.users_id },
      relations: ['role'],
    });
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return { user, roles };
  }

  async recoveryKeyEUser(recoveryKeyUser: recoveryKeyEDto): Promise<any> {

    const userResponse = await this.userRepository.findOne({ where: { email_users:recoveryKeyUser.correo_user } });
  
  if (!userResponse) {
    throw new NotFoundException(`No se encontro el correo solicitado`);
  }

    return {preguntasecreta_users: userResponse.preguntasecreta_users};
  }

 async recoveryKeyQUser(recoveryKeyUser: recoveryKeyQDto): Promise<any> {

    const userResponse = await this.userRepository.findOne({ where: { email_users:recoveryKeyUser.correo_user, respuestapregunta_users: recoveryKeyUser.respuestaPregunta_users } });
    
    if (!userResponse) {
    throw new NotFoundException(`La respuesta a la pregunta es incorrecta`);
  }
    
    return {respuestapregunta_users: userResponse.respuestapregunta_users};

  }

  

}