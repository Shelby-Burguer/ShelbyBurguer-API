import { pdtcb_odEntity } from 'src/orden/infraestructure/entities/pdtcb_od.orm';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { igdt_pdtEntity } from './igdt_pdt.orm';
import { pdt_cbEntity } from './pdt_cb.orm';

@Entity('producto')
export class productoEntity extends BaseEntity {
  @PrimaryColumn()
  producto_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  nombre_producto: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  tipo_producto: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  costo_producto: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  nombre_imagen: string;

  @OneToMany(() => igdt_pdtEntity, (igdt_pdt) => igdt_pdt.producto)
  igdt_pdt: igdt_pdtEntity;

  @OneToMany(() => pdt_cbEntity, (pdt_cb) => pdt_cb.producto)
  pdt_cb: pdt_cbEntity;

  @OneToMany(() => pdtcb_odEntity, (pdtcb_od) => pdtcb_od.producto)
  pdtcb_od: pdtcb_odEntity;
}
