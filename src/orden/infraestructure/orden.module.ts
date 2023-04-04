import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarEntity } from 'src/ordenar_pedidos/infrastructure/entities/lugar.entity';
import { ordenService } from '../application/service/orden.service';
import { ordenPersisteceAdapter } from './adapters/orden.adapter';
import { ordenController } from './controller/orden.controller';
import { estadoEntity } from './entities/estado.orm';
import { estado_ordenEntity } from './entities/estado_orden.orm';
import { OrdenEntity } from './entities/orden.orm';
import { orden_lugarEntity } from './entities/orden_lugar.orm';
import { ordenPagoEntity } from './entities/orden_pago.orm';
import { pagoEfectivoEntity } from './entities/pagoEfectivo.orm';
import { pagoElectronicoEntity } from './entities/pagoElectronico.orm';
import { pdtcb_odEntity } from './entities/pdtcb_od.orm';
import { zelleEntity } from './entities/zelle.orm';
import { montoBs_DolaresEntity } from './entities/montoBS_Dolares.orm';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenEntity, pdtcb_odEntity, orden_lugarEntity, LugarEntity, estadoEntity, estado_ordenEntity, zelleEntity, pagoElectronicoEntity, pagoEfectivoEntity, ordenPagoEntity, montoBs_DolaresEntity])],
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
