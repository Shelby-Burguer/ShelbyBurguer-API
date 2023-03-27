import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { productoEntity } from '../../../producto_combo/infraestructure/orm/producto.orm';
import { comboEntity } from '../../../producto_combo/infraestructure/orm/combo.orm';
import { OrdenEntity } from './orden.orm';
import { LugarEntity } from 'src/ordenar_pedidos/infrastructure/entities/lugar.entity';

@Entity('orden_lugar')
export class orden_lugarEntity extends BaseEntity {
  @PrimaryColumn()
  orden_lugar_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  orden_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lugar_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  precio_historico: string;

@ManyToOne(() => OrdenEntity, (orden) => orden.orden_lugar, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'orden_id' })
  orden: OrdenEntity;

@ManyToOne(() => LugarEntity, (lugar) => lugar.orden_lugar, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'lugar_id' })
  lugar: LugarEntity;

}
