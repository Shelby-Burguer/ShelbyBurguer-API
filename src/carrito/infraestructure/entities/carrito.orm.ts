import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('carrito')
export class carritoEntity extends BaseEntity {
  @PrimaryColumn()
  carrito_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  orden_id: string;
}