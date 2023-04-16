import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { roleEntity } from './role.orm';
import { userEntity } from './user.orm';

@Entity('user_role')
export class userRoleEntity extends BaseEntity {
  @PrimaryColumn()
  user_role_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  roles_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  users_id: string;

  @ManyToOne(() => userEntity, (user) => user.user_role, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'users_id' })
  user: userEntity;

  @ManyToOne(() => roleEntity, (role) => role.user_role, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'roles_id' })
  role: roleEntity;
}
