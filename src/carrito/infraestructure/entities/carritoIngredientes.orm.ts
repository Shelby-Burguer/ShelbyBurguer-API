import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('carrito_ingrediente')
export class carritoIngredienteEntity extends BaseEntity {
  @PrimaryColumn()
  carrito_ingrediente_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  ingrediente_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  cantidad: string;

}