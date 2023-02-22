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
import { ingredienteEntity } from './ingrediente.orm';
import { productoEntity } from './producto.orm';

@Entity('igdt_pdt')
export class igdt_pdtEntity extends BaseEntity {
  @PrimaryColumn()
  igdt_pdt_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  cantidad_igdt_pdt: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  ingrediente_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  producto_id: string;

  @ManyToOne(() => ingredienteEntity, (ingrediente) => ingrediente.igdt_pdt, {
    eager: true, cascade: true
  })
  @JoinColumn({ name: 'ingrediente_id' })
  ingrediente: ingredienteEntity[];

  @ManyToOne(() => productoEntity, (producto) => producto.igdt_pdt, {
    eager: true, cascade: true
  })
  @JoinColumn({ name: 'producto_id' })
  producto: productoEntity[];

}