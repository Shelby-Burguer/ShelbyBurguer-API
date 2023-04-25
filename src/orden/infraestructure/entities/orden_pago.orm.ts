import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { OrdenEntity } from './orden.orm';
import { LugarEntity } from 'src/ordenar_pedidos/infrastructure/entities/lugar.entity';
import { pagoEfectivoEntity } from './pagoEfectivo.orm';
import { pagoElectronicoEntity } from './pagoElectronico.orm';
import { zelleEntity } from './zelle.orm';
import { montoBs_DolaresEntity } from './montoBS_Dolares.orm';
import { ordenPago_pagoEfectivoEntity } from './ordenPago_PagoEfectivo.orm';

@Entity('orden_pago')
export class ordenPagoEntity extends BaseEntity {
  @PrimaryColumn()
  orden_pago_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  orden_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  pago_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  zelle_id: string;
  
  @Column({ type: 'varchar', length: 300, nullable: true })
  montobs_dolares_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  fecha_historial: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  monto: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  monto_dolares: string;

@ManyToOne(() => pagoElectronicoEntity, (pagoElectronico) => pagoElectronico.estado_orden, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'pago_id' })
  pagoElectronico: pagoElectronicoEntity;

  @ManyToOne(() => zelleEntity, (zelle) => zelle.estado_orden, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'zelle_id' })
  zelle: zelleEntity;

  @ManyToOne(() => montoBs_DolaresEntity, (montoBs_Dolares) => montoBs_Dolares.estado_orden, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'montobs_dolares_id' })
  montoBs_Dolares: montoBs_DolaresEntity;

  @OneToMany(() => ordenPago_pagoEfectivoEntity, (ordenPago_pagoEfectivo) => ordenPago_pagoEfectivo.ordenPago)
  ordenPago_pagoEfectivo: ordenPago_pagoEfectivoEntity[];
  
}
