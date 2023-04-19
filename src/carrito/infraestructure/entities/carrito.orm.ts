import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { carritoIngrediente_carritoEntity } from './carritoIngredienteCarritoEntity.orm';

@Entity('carrito')
export class carritoEntity extends BaseEntity {
  @PrimaryColumn()
  carrito_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  orden_id: string;

  @OneToMany(() => carritoIngrediente_carritoEntity, (carritoIngrediente_carrito) => carritoIngrediente_carrito.carrito)
  carritoIngrediente_carrito: carritoIngrediente_carritoEntity[];


}
