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

}