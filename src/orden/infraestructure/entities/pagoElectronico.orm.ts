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

@Entity('pago_electronico')
export class pagoElectronicoEntity extends BaseEntity {
  @PrimaryColumn()
  pago_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  numero_referencia: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  tipo_pago: string;

  @OneToMany(() => ordenPagoEntity, (orden_pago) => orden_pago.pagoElectronico)
  estado_orden: ordenPagoEntity[];

}