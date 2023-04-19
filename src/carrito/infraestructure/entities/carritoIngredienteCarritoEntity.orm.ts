import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { productoEntity } from '../../../producto_combo/infraestructure/orm/producto.orm';
import { comboEntity } from '../../../producto_combo/infraestructure/orm/combo.orm';
import { OrdenEntity } from '../../../orden/infraestructure/entities/orden.orm';
import { LugarEntity } from 'src/ordenar_pedidos/infrastructure/entities/lugar.entity';
import { carritoEntity } from './carrito.orm';
import { carritoIngredienteEntity } from './carritoIngredientes.orm';

@Entity('carritoingrediente_carrito')
export class carritoIngrediente_carritoEntity extends BaseEntity {
  @PrimaryColumn()
  carritoingrediente_carrito_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  carrito_ingrediente_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  carrito_id: string;

@ManyToOne(() => carritoEntity, (carrito) => carrito.carritoIngrediente_carrito, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'carrito_id' })
  carrito: carritoEntity;

@ManyToOne(() => carritoIngredienteEntity, (carritoIngrediente) => carritoIngrediente.carritoIngrediente_carrito, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'carrito_ingrediente_id' })
  carritoIngrediente: carritoIngredienteEntity;
}

