import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { pagoEfectivoEntity } from './pagoEfectivo.orm';
import { ordenPagoEntity } from './orden_pago.orm';

@Entity('pagoefectivo_ordenpago')
export class ordenPago_pagoEfectivoEntity extends BaseEntity {
  @PrimaryColumn()
  pagoefectivo_ordenpago_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  dolares_efectivo_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  orden_pago_id: string;

@ManyToOne(() => ordenPagoEntity, (ordenPago) => ordenPago.ordenPago_pagoEfectivo, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'orden_pago_id' })
  ordenPago: ordenPagoEntity;

@ManyToOne(() => pagoEfectivoEntity, (pagoEfectivo) => pagoEfectivo.ordenPago_pagoEfectivo, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'dolares_efectivo_id' })
  pagoEfectivo: pagoEfectivoEntity;

}
