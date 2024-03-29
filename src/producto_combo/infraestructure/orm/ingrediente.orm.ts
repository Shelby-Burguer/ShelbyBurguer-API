import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { igdt_pdtEntity } from './igdt_pdt.orm';
import { registro_productoEntity } from 'src/orden/infraestructure/entities/registroProducto.orm';

@Entity('ingrediente')
export class ingredienteEntity extends BaseEntity {
  @PrimaryColumn()
  ingrediente_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_ingrediente: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  unidad_ingrediente: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  objecturl_ingrediente: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  nombre_imagen: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  extra: string;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  datos_imagen: Uint8Array;

  @Column({ type: 'varchar', length: 300, nullable: true })
  proteina_ingrediente: string;

  @OneToMany(() => igdt_pdtEntity, (igdt_pdt) => igdt_pdt.ingrediente)
  igdt_pdt: igdt_pdtEntity[];

  @OneToMany(() => registro_productoEntity, (registro_producto) => registro_producto.ingrediente)
  registro_producto: registro_productoEntity[];

  
}
