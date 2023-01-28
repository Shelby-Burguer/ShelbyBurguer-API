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
import { ingredienteEntity } from './orm/ingrediente.orm';
import { productoEntity } from './orm/producto.orm';
import { comboEntity } from './orm/combo.orm';
import { igdt_pdtEntity } from './orm/igdt_pdt.orm';
import { pdt_cbEntity } from './orm/pdt_cb.orm';

@Module({
  controllers: [ingredienteController],
  providers: [
    ingredienteDataMapper,
    ingredientePersisteceAdapter,
    ingredienteService,
    allIngredienteHandler,
    createIngredientetHandler,
    updateIngredienteHandler,
    deleteIngredientetHandler,
  ],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      ingredientePersisteceAdapter,
      ingredienteEntity,
      productoEntity,
      comboEntity,
      igdt_pdtEntity,
      pdt_cbEntity,
    ]),
  ],
})
export class ingredienteModule {}
