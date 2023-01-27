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

@Entity('producto')
export class productoEntity extends BaseEntity {
  @PrimaryColumn()
   producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_producto: string;
}