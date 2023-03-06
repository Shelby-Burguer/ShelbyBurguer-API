import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarDto } from '../application/dto/lugar.dto';
import { LugarMapper } from '../application/mappers/lugar.mapper';
import { LugarService } from '../application/service/lugar.service';
import LugarAdapter from './adapters/lugar.adapter';
import ClienteController from './controller/cliente.controller';
import LugarController from './controller/lugar.controller';
import { ClienteEntity } from './entities/cliente.entity';
import { LugarEntity } from './entities/lugar.entity';
import { LugarRepositoryImpl } from './repositories/lugar.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LugarEntity, LugarRepositoryImpl, ClienteEntity]),
  ],
  controllers: [LugarController, ClienteController],
  providers: [LugarMapper, LugarService, LugarAdapter, LugarDto],
})
export class LugarModule {}
