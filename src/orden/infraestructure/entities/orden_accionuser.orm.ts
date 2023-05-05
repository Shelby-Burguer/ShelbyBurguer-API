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
import { accion_userEntity } from './accion_user.orm';

@Entity('orden_accionuser')
export class orden_accionuserEntity extends BaseEntity {
  @PrimaryColumn()
  orden_accionuser_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  accion_user_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  orden_id: string;

  @ManyToOne(() => accion_userEntity, (accion_user) => accion_user.orden_accionuser, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'accion_user_id' })
  accion_user: accion_userEntity;

  @ManyToOne(() => OrdenEntity, (Orden) => Orden.orden_accionuser, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'orden_id' })
  Orden: OrdenEntity;

}