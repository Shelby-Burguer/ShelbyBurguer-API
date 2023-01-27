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

@Entity('combo')
export class comboEntity extends BaseEntity {
  @PrimaryColumn()
   combo_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_combo: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  tiempo_aprox_preparacion_combo: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  precio_unitario_combo: string;

}