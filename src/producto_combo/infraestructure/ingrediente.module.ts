import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ingredienteController } from './controller/ingrediente.controller';
import { ingredienteDataMapper } from '../domain/mappers/ingrediente.mapper';
import { ingredientePersisteceAdapter } from './adapter/ingrediente.adapter';
import { ingredienteService } from '../application/service/ingrediente.service';
import { allIngredienteHandler } from '../application/handler/readIngrediente.handler';
import { createIngredientetHandler } from '../application/handler/createingrediente.handler';
import { updateIngredienteHandler } from '../application/handler/updateIngrediente.handler';
import { deleteIngredientetHandler } from '../application/handler/deleteIngrediente.handler';
import { createImagenIngredientetHandler } from '../application/handler/createImagenIngrediente.handler';
import { ingredienteEntity } from './orm/ingrediente.orm';
import { productoEntity } from './orm/producto.orm';
import { comboEntity } from './orm/combo.orm';
import { igdt_pdtEntity } from './orm/igdt_pdt.orm';
import { pdt_cbEntity } from './orm/pdt_cb.orm';
import { productoController } from './controller/producto.controller';
import { createProductoHandler } from '../application/handler/createProducto.handler';
import { productoDataMapper } from '../domain/mappers/producto.mapper';
import { productoService } from '../application/service/producto.service';
import { productoPersisteceAdapter } from './adapter/producto.adapter';


@Module({
  controllers: [ingredienteController, productoController],
  providers: [
    ingredienteDataMapper,
    productoDataMapper,
    ingredientePersisteceAdapter,
    ingredienteService,
    productoService,
    allIngredienteHandler,
    createIngredientetHandler,
    updateIngredienteHandler,
    deleteIngredientetHandler,
    createImagenIngredientetHandler,
    createProductoHandler,

  ],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      ingredientePersisteceAdapter,
      productoPersisteceAdapter,
      ingredienteEntity,
      productoEntity,
      comboEntity,
      igdt_pdtEntity,
      pdt_cbEntity,
    ]),
  ],
})
export class ingredienteModule {}
