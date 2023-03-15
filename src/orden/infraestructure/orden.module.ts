import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ordenService } from '../application/service/orden.service';
import { ordenPersisteceAdapter } from './adapters/orden.adapter';
import { ordenController } from './controller/orden.controller';
import { OrdenEntity } from './entities/orden.orm';
import { pdtcb_odEntity } from './entities/pdtcb_od.orm';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenEntity, pdtcb_odEntity])],
  controllers: [ordenController],
  providers: [
    ordenService,
    {
      provide: 'iOrdenRepository',
      useClass: ordenPersisteceAdapter,
    },
  ],
  exports: [],
})
export class ordenModule {}
