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
  email_users: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password_users: string;

  @OneToMany(() => userRoleEntity, (user_role) => user_role.user)
  user_role: userRoleEntity[];

}