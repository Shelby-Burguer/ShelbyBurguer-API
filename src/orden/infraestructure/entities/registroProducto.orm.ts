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
import { ingredienteEntity } from 'src/producto_combo/infraestructure/orm/ingrediente.orm';
import { pdtcb_odEntity } from './pdtcb_od.orm';

@Entity('registro_producto')
export class registro_productoEntity extends BaseEntity {
  @PrimaryColumn()
  registro_producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  ingrediente_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  pdtcb_od_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  cantidad: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  precio: string;

@ManyToOne(() => productoEntity, (producto) => producto.registro_producto, {
    eager: true,
  })
  @JoinColumn({ name: 'producto_id' })
  producto: productoEntity;

@ManyToOne(() => ingredienteEntity, (ingrediente) => ingrediente.registro_producto, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'ingrediente_id' })
  ingrediente: ingredienteEntity;

  @ManyToOne(() => pdtcb_odEntity, (pdtcb_od) => pdtcb_od.registro_producto, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'pdtcb_od_id' })
  pdtcb_od: pdtcb_odEntity;
  
}