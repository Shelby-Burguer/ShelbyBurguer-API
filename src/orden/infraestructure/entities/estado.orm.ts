import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToMany
} from 'typeorm';
import { productoEntity } from '../../../producto_combo/infraestructure/orm/producto.orm';
import { comboEntity } from '../../../producto_combo/infraestructure/orm/combo.orm';
import { OrdenEntity } from './orden.orm';
import { LugarEntity } from 'src/ordenar_pedidos/infrastructure/entities/lugar.entity';
import { estado_ordenEntity } from './estado_orden.orm';

@Entity('estado')
export class estadoEntity extends BaseEntity {
  @PrimaryColumn()
  estado_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_estado: string;

  @OneToMany(() => estado_ordenEntity, (estado_orden) => estado_orden.orden)
  estado_orden: estado_ordenEntity[];

}
