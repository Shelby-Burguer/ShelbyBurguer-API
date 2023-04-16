import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { roleEntity } from './entities/role.orm';
import { userEntity } from './entities/user.orm';
import { userRoleEntity } from './entities/userRole.orm';
import { autenticacionService } from '../application/service/autenticacion.service';
import { autenticacionPersisteceAdapter } from './adapters/autenticacion.adapter';
import { autenticacionController } from './controller/autenticacion.controller';
import { JwtStrategy } from '../application/service/jwtauth.service';
import { RolesGuard } from '../application/service/auth/rolesGuard.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([roleEntity, userEntity, userRoleEntity]),
  ],
  controllers: [autenticacionController],
  providers: [
  autenticacionService,
  JwtStrategy, 
  RolesGuard,
    {
      provide: 'iAutenticacionRepository',
      useClass: autenticacionPersisteceAdapter,
    },
  ],
  exports: [],
})
export class autenticacionModule {}