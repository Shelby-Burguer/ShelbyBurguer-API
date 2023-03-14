import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productoEntity } from '../../producto_combo/infraestructure/orm/producto.orm';
import { carritoService } from '../application/service/carrito.service';
import { ordenService } from '../application/service/orden.service';
import { carritoPersisteceAdapter } from './adapters/carrito.adapter';
import { ordenPersisteceAdapter } from './adapters/orden.adapter';
import { carritoController } from './controller/carrito.controller';
import { ordenController } from './controller/orden.controller';
import { carritoEntity } from './entities/carrito.orm';
import { OrdenEntity } from './entities/orden.orm';


@Module({
  imports: [TypeOrmModule.forFeature([carritoEntity, productoEntity])],
  controllers: [carritoController],
  providers: [
    carritoService, 
    {
      provide: 'iCarritoRepository',
      useClass: carritoPersisteceAdapter,
    },
  ],
  exports: [],
})
export class carritoModule {}
