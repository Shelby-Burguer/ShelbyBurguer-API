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
import { ordenPagoEntity } from './orden_pago.orm';

@Entity('montobs_dolares')
export class montoBs_DolaresEntity extends BaseEntity {
  @PrimaryColumn()
  montobs_dolares_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  monto: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  fecha_historial: string;

  @OneToMany(() => ordenPagoEntity, (orden_pago) => orden_pago.montoBs_Dolares)
  estado_orden: ordenPagoEntity[];

}