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
import { orden_lugarEntity } from './orden_lugar.orm';
import { estadoEntity } from './estado.orm';

@Entity('estado_orden')
export class estado_ordenEntity extends BaseEntity {
  @PrimaryColumn()
  estado_orden_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  fecha_historial: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  orden_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  estado_id: string;

  @ManyToOne(() => OrdenEntity, (orden) => orden.estado_orden, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'orden_id' })
  orden: OrdenEntity;

  @ManyToOne(() => estadoEntity, (estado) => estado.estado_orden, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'estado_id' })
  estado: estadoEntity;

}
