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
import { registro_productoEntity } from './registroProducto.orm';

@Entity('pdtcb_od')
export class pdtcb_odEntity extends BaseEntity {
  @PrimaryColumn()
  pdtcb_od_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  orden_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  combo_id: string;

@ManyToOne(() => productoEntity, (producto) => producto.pdtcb_od, {
    eager: true,
  })
  @JoinColumn({ name: 'producto_id' })
  producto: productoEntity;

@ManyToOne(() => comboEntity, (combo) => combo.pdtcb_od, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'combo_id' })
  combo: comboEntity;

  @ManyToOne(() => OrdenEntity, (orden) => orden.pdtcb_od, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'orden_id' })
  orden: OrdenEntity;

  @OneToMany(() => registro_productoEntity, (registro_producto) => registro_producto.pdtcb_od)
  registro_producto: registro_productoEntity[];

}
