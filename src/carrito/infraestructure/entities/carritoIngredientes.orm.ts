import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { carritoIngrediente_carritoEntity } from './carritoIngredienteCarritoEntity.orm';

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

  @Column({ type: 'varchar', length: 300, nullable: false })
  precio: string;

  @OneToMany(() => carritoIngrediente_carritoEntity, (carritoIngrediente_carrito) => carritoIngrediente_carrito.carritoIngrediente)
  carritoIngrediente_carrito: carritoIngrediente_carritoEntity[];


}