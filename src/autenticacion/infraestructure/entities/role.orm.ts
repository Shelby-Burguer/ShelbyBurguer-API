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

@Entity('roles')
export class roleEntity extends BaseEntity {
  @PrimaryColumn()
  roles_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  nombre_roles: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  descripcion_roles: string;

  @OneToMany(() => userRoleEntity, (user_role) => user_role.role)
  user_role: userRoleEntity[];

}