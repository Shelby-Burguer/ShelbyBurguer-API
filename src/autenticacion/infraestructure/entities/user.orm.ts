import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToMany
} from 'typeorm';

import { userRoleEntity } from './userRole.orm';

@Entity('users')
export class userEntity extends BaseEntity {
  @PrimaryColumn()
  users_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  apellido_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  cedula_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  telefono_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  direccion_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  fecha_inicio_users: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  fecha_final_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  email_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  preguntasecreta_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  respuestapregunta_users: string;

  @OneToMany(() => userRoleEntity, (user_role) => user_role.user)
  user_role: userRoleEntity[];

}