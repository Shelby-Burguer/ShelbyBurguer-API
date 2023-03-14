import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ClienteEntity } from './cliente.entity';

enum TipoLugar {
  Zona = 'Zona',
  Dirección = 'Dirección',
  Referencia = 'Referencia',
}

@Entity('lugar')
export class LugarEntity extends BaseEntity {
  @PrimaryColumn()
  id_lugar: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre_lugar: string;

  @Column({ type: 'enum', enum: TipoLugar, nullable: false })
  tipo_lugar: string;

  @Column({ type: 'real', nullable: true })
  precio_lugar: number;

  @Column({ type: 'string', nullable: true })
  id_padre_lugar: string;

  @OneToMany(() => ClienteEntity, (cliente) => cliente.lugar)
  clientes: ClienteEntity[];

  @JoinColumn({ name: 'id_padre_lugar' })
  @ManyToOne(() => LugarEntity, (lugar) => lugar.lugaresHijos, {
    nullable: true,
  })
  lugarPadre: LugarEntity;

  @OneToMany(() => LugarEntity, (lugar) => lugar.lugarPadre, {
    nullable: true,
  })
  lugaresHijos: LugarEntity[];
}
