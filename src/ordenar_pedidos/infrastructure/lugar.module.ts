import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteDTO } from '../application/dto/cliente.dto';
import { LugarDto } from '../application/dto/lugar.dto';
import { ClienteMapper } from '../application/mappers/cliente.mapper';
import { LugarMapper } from '../application/mappers/lugar.mapper';
import { ClienteService } from '../application/service/cliente.service';
import { LugarService } from '../application/service/lugar.service';
import ClienteAdapter from './adapters/cliente.adapter';
import LugarAdapter from './adapters/lugar.adapter';
import ClienteController from './controller/cliente.controller';
import LugarController from './controller/lugar.controller';
import { ClienteEntity } from './entities/cliente.entity';
import { LugarEntity } from './entities/lugar.entity';
import { ClienteRepositoryImpl } from './repositories/cliente.repository';
import { LugarRepositoryImpl } from './repositories/lugar.repository';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';

@Module({
  imports: [TypeOrmModule.forFeature([LugarEntity, ClienteEntity])],
  controllers: [LugarController, ClienteController],
  providers: [
    LugarService,
    LugarMapper,
    LugarAdapter,
    LugarDto,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: 'ILugarRepository',
      useClass: LugarRepositoryImpl,
    },
    ClienteService,
    ClienteMapper,
    ClienteAdapter,
    ClienteDTO,
    {
      provide: 'IClienteRepository',
      useClass: ClienteRepositoryImpl,
    },
  ],
  exports: [],
})
export class LugarModule {}
