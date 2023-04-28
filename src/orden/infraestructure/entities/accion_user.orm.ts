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
import { orden_accionuserEntity } from './orden_accionuser.orm';

@Entity('accion_user')
export class accion_userEntity extends BaseEntity {
  @PrimaryColumn()
  accion_user_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_accion: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_user: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  role_user: string;
  
  @Column({ type: 'varchar', length: 300, nullable: false })
  fecha_accion_user_orden: string;

  @OneToMany(() => orden_accionuserEntity, (orden_accionuser) => orden_accionuser.accion_user)
  orden_accionuser: orden_accionuserEntity[];

}
