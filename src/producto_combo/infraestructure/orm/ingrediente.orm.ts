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

@Entity('ingrediente')
export class ingredienteEntity extends BaseEntity {
  @PrimaryColumn()
  ingrediente_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_ingrediente: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  unidad_ingrediente: string;

  @OneToMany(() => igdt_pdtEntity, (igdt_pdt) => igdt_pdt.ingrediente)
  igdt_pdt: igdt_pdtEntity[];

}