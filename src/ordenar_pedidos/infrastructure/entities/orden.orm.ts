import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { pdt_cbEntity } from '../../../producto_combo/infraestructure/orm/pdt_cb.orm';

@Entity('orden')
export class OrdenEntity extends BaseEntity {
  @PrimaryColumn()
  orden_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  fecha_orden: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  hora_orden: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  numero_mesa: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  descuento: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  tipo_orden: string;
}
