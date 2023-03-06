import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LugarEntity } from './lugar.entity';

@Entity()
export class ClienteEntity extends BaseEntity {
  @PrimaryColumn()
  id_cliente: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  cedula_cliente: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre_cliente: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  apellido_cliente: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  telefono_cliente: string;

  @ManyToOne(() => LugarEntity, (lugar) => lugar.clientes)
  @JoinColumn({ name: 'id_lugar_cliente' })
  lugar: LugarEntity;
}
