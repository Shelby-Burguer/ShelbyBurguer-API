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
import { allProductoHandler } from '../application/handler/readProducto.handler';
import { deleteProductotHandler } from '../application/handler/deleteProducto.handler';
import { updateProductoHandler } from '../application/handler/updateProducto.handler';
import { igdtPdtController } from './controller/igdt_pdt.controller';
import { createIgdtPdtHandler } from '../application/handler/createIgdtPdt.handler';
import { igdtPdtService } from '../application/service/IgdtPdt.servicer';
import { igdtPdtPersisteceAdapter } from './adapter/igdtPdt.adapter';
import { igdtPdtDataMapper } from '../domain/mappers/igdtPdt.mapper';
import { allIgdtPdtHandler } from '../application/handler/readIgdtPdt.handler';
import { IgdtPdtIdHandler } from '../application/handler/readIgdtPdtId.handler';
import { updateIgdtPdtHandler } from '../application/handler/updateIgdtPd.handle';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      productoPersisteceAdapter,
      igdtPdtPersisteceAdapter,
      ingredienteEntity,
      productoEntity,
      comboEntity,
      igdt_pdtEntity,
      pdt_cbEntity,
    ]),
  ],
  controllers: [ingredienteController, productoController, igdtPdtController],
  providers: [
    ingredienteDataMapper,
    productoDataMapper,
    igdtPdtDataMapper,
    {
      provide: 'iIngredienteRepository',
      useClass: ingredientePersisteceAdapter,
    },
    ingredienteService,
    productoService,
    igdtPdtService,
    allIngredienteHandler,
    allProductoHandler,
    deleteProductotHandler,
    updateProductoHandler,
    createIngredientetHandler,
    updateIngredienteHandler,
    deleteIngredientetHandler,
    createIgdtPdtHandler,
    createImagenIngredientetHandler,
    createProductoHandler,
    allIgdtPdtHandler,
    IgdtPdtIdHandler,
    updateIgdtPdtHandler,
  ],
})
export class ingredienteModule {}
