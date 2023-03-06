import { Module } from '@nestjs/common';
import { LugarService } from '../application/service/lugar.service';
import LugarController from './controller/lugar.controller';

@Module({
  controllers: [LugarController],
  providers: [LugarService],
})
export class LugarModule {}
