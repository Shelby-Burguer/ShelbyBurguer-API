import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToMany
} from 'typeorm';
import { ordenPagoEntity } from './orden_pago.orm';
import { ordenPago_pagoEfectivoEntity } from './ordenPago_PagoEfectivo.orm';

@Entity('pago_efectivo')
export class pagoEfectivoEntity extends BaseEntity {
  @PrimaryColumn()
  dolares_efectivo_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  numero_serie: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  denominacion: string;

 @Column({ type: 'varchar', length: 300, nullable: true })
  cantidad_billetes: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  tipo_pago: string;

  @OneToMany(() => ordenPago_pagoEfectivoEntity, (ordenPago_pagoEfectivo) => ordenPago_pagoEfectivo.pagoEfectivo)
  ordenPago_pagoEfectivo: ordenPago_pagoEfectivoEntity[];

}