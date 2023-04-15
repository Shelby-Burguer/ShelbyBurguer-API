import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productoEntity } from '../../producto_combo/infraestructure/orm/producto.orm';
import { carritoService } from '../application/service/carrito.service';
import { ordenService } from '../../orden/application/service/orden.service';
import { carritoPersisteceAdapter } from './adapters/carrito.adapter';
import { ordenPersisteceAdapter } from '../../orden/infraestructure/adapters/orden.adapter';
import { carritoController } from './controller/carrito.controller';
import { ordenController } from '../../orden/infraestructure/controller/orden.controller';
import { carritoEntity } from './entities/carrito.orm';
import { OrdenEntity } from '../../orden/infraestructure/entities/orden.orm';
import { pdtcb_odEntity } from '../../orden/infraestructure/entities/pdtcb_od.orm';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { carritoIngredienteEntity } from './entities/carritoIngredientes.orm';
import { registro_productoEntity } from 'src/orden/infraestructure/entities/registroProducto.orm';

@Module({
  imports: [
    TypeOrmModule.forFeature([carritoEntity, productoEntity, pdtcb_odEntity, carritoIngredienteEntity, registro_productoEntity ]),
  ],
  controllers: [carritoController],
  providers: [
    carritoService,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: 'iCarritoRepository',
      useClass: carritoPersisteceAdapter,
    },
  ],
  exports: [],
})
export class carritoModule {}
