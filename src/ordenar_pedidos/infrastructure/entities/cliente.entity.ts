import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LugarEntity } from './lugar.entity';

@Entity('cliente')
export class ClienteEntity extends BaseEntity {
  @PrimaryColumn()
  id_cliente: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  cedula_cliente: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre_cliente: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  apellido_cliente: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  telefono_cliente: string;

  @Column({ type: 'string', nullable: true })
  id_lugar_cliente: string;

  @JoinColumn({ name: 'id_lugar_cliente' })
  @ManyToOne(() => LugarEntity, (lugar) => lugar.clientes, {
    nullable: true,
  })
  lugar: LugarEntity;
}
