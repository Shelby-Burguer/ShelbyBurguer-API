import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*import { styleEntity } from '../../style/infraestructure/orm/style.orm';
import { modelEntity } from '../../model/infraestructure/orm/model.orm';
import { collectionEntity } from './orm/collection.orm';
import { colorEntity } from './orm/color.orm';
import { typeStyleEntity } from './orm/typeStyle.orm';
import { atributeEntity } from './orm/atribute.orm';
import { colorGs1Entity } from './orm/ColorGs1.orm';
import { colorCombineEntity } from './orm/color_combine.orm';
import { collectionController } from './controller/collection.controller';
import { collectionService } from '../application/service/collection.service';
import { collectionPersisteceAdapter } from './Adapter/collection.persistance.adapter';
import { collectionDataMapper } from '../domain/mappers/collection.mapper';
import { allcollectiontHandler } from '../application/handler/readcollection.handler';
import { CreatecollectiontHandler } from '../application/handler/createCollection.handler';
import { updatecollectiontHandler } from '../application/handler/updateCollection.handler';*/
import { CqrsModule } from '@nestjs/cqrs';
import { ingredienteController } from './controller/ingrediente.controller';
import { ingredienteDataMapper } from '../domain/mappers/ingrediente.mapper';
import { ingredientePersisteceAdapter } from './adapter/ingrediente.adapter';
import { ingredienteService } from '../application/service/ingrediente.service';
import { allIngredienteHandler } from '../application/handler/readIngrediente.handler';
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
  ],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      ingredientePersisteceAdapter,
      ingredienteEntity,
      productoEntity,
      comboEntity,
      igdt_pdtEntity,
      pdt_cbEntity
    ]),
  ],
})
export class ingredienteModule {}