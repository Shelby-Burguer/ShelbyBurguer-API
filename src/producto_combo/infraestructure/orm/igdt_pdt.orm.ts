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

@Entity('igdt_pdt')
export class igdt_pdtEntity extends BaseEntity {
  @PrimaryColumn()
  igdt_pdt_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  cantidad_igdt_pdt: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  ingrediente_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  producto_id: string;

}