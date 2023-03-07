import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { productoEntity } from './producto.orm';
import { comboEntity } from './combo.orm';

@Entity('pdt_cb')
export class pdt_cbEntity extends BaseEntity {
  @PrimaryColumn()
  pdt_cd_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  cantidad_pdt_cb: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  combo_id: string;

  @ManyToOne(() => productoEntity, (producto) => producto.pdt_cb, {
    eager: true,
  })
  @JoinColumn({ name: 'pdt_cd_id' })
  producto: productoEntity[];

  @ManyToOne(() => comboEntity, (combo) => combo.pdt_cb, {
    eager: true,
  })
  @JoinColumn({ name: 'producto_id' })
  combo: comboEntity[];
}
