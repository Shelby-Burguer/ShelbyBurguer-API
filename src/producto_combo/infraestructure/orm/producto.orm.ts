import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { igdt_pdtEntity } from './igdt_pdt.orm';
import { pdt_cbEntity } from './pdt_cb.orm';


@Entity('producto')
export class productoEntity extends BaseEntity {
  @PrimaryColumn()
   producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_producto: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  tipo_producto: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  costo_producto: string;

  @OneToMany(() => igdt_pdtEntity, (igdt_pdt) => igdt_pdt.producto)
  igdt_pdt: igdt_pdtEntity;

  @OneToMany(() => pdt_cbEntity, (pdt_cb) => pdt_cb.producto)
  pdt_cb: pdt_cbEntity;

}