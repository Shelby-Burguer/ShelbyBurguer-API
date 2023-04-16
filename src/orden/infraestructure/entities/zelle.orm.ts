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

@Entity('zelle')
export class zelleEntity extends BaseEntity {
  @PrimaryColumn()
  zelle_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  correo_electronico: string;

  @OneToMany(() => ordenPagoEntity, (orden_pago) => orden_pago.zelle)
  estado_orden: ordenPagoEntity[];
  
}