import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { ClienteEntity } from './cliente.entity';

enum TipoLugar {
  Zona = 'Zona',
  Dirección = 'Dirección',
  Referencia = 'Referencia',
}

@Entity()
export class LugarEntity extends BaseEntity {
  @PrimaryColumn()
  id_lugar: string;

  @Column({ type: 'varchar', length: 40, nullable: false })
  nombre_lugar: string;

  @Column({ type: 'enum', enum: TipoLugar, nullable: false })
  tipo_lugar: string;

  @Column({ type: 'real', nullable: false })
  precio: number;

  @OneToMany(() => ClienteEntity, (cliente) => cliente.lugar)
  clientes: ClienteEntity[];
}
