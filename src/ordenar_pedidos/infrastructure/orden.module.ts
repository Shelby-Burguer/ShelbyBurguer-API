import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ordenService } from '../application/service/orden.service';
import { ordenPersisteceAdapter } from './adapters/orden.adapter';
import { ordenController } from './controller/orden.controller';
import { OrdenEntity } from './entities/orden.orm';


@Module({
  imports: [TypeOrmModule.forFeature([OrdenEntity])],
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
