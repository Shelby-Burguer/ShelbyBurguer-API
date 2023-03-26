import { pdtcb_odEntity } from 'src/orden/infraestructure/entities/pdtcb_od.orm';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { pdt_cbEntity } from './pdt_cb.orm';

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

  @OneToMany(() => pdt_cbEntity, (pdt_cb) => pdt_cb.combo)
  pdt_cb: pdt_cbEntity[];

  @OneToMany(() => pdtcb_odEntity, (pdtcb_od) => pdtcb_od.combo)
  pdtcb_od: pdtcb_odEntity[];
}
