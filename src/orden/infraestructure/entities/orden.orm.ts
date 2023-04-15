import { ClienteEntity } from 'src/ordenar_pedidos/infrastructure/entities/cliente.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { estado_ordenEntity } from './estado_orden.orm';
import { orden_lugarEntity } from './orden_lugar.orm';
import { pdtcb_odEntity } from './pdtcb_od.orm';
import { registro_productoEntity } from './registroProducto.orm';

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

  @Column({ type: 'varchar', length: 300, nullable: false })
  total_orden: string;

  @Column({ type: 'int', nullable: false })
  numero_orden: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  cliente_id: string;

  @OneToMany(() => pdtcb_odEntity, (pdtcb_od) => pdtcb_od.orden)
  pdtcb_od: pdtcb_odEntity[];

  @OneToMany(() => orden_lugarEntity, (orden_lugar) => orden_lugar.orden)
  orden_lugar: orden_lugarEntity[];

  @OneToMany(() => estado_ordenEntity, (estado_orden) => estado_orden.orden)
  estado_orden: estado_ordenEntity[];

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.orden, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClienteEntity;
}