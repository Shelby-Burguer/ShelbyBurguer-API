import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { OrdenEntity } from './orden.orm';
import { LugarEntity } from 'src/ordenar_pedidos/infrastructure/entities/lugar.entity';
import { pagoEfectivoEntity } from './pagoEfectivo.orm';
import { pagoElectronicoEntity } from './pagoElectronico.orm';
import { zelleEntity } from './zelle.orm';

@Entity('orden_pago')
export class ordenPagoEntity extends BaseEntity {
  @PrimaryColumn()
  orden_pago_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  orden_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  pago_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  dolares_efectivo_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  zelle_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  fecha_historial: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  monto: string;

@ManyToOne(() => pagoEfectivoEntity, (pagoEfectivo) => pagoEfectivo.estado_orden, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'dolares_efectivo_id' })
  pagoEfectivo: pagoEfectivoEntity;

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

}
