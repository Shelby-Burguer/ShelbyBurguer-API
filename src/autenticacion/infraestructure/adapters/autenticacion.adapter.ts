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

  async createUser(_user: userDto): Promise<any> {
    const user = new userEntity();
    user.users_id = new UniqueId().getId();
    user.nombre_users = _user.nombre_user;
    user.email_users = _user.email_user;
    user.password_users = _user.password_user;
 
    await this.userRepository.save(user);

    return {
      user_id: user.users_id,
      nombre_user: user.nombre_users,
      email_user: user.email_users,
      password_user: user.password_users
    };
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

    const token = sign({ userId: user.users_id, role: roles.role.nombre_roles }, 'secretKey', { expiresIn: '1h' });
    return token;
  }

}