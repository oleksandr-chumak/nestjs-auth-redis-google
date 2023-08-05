import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@common/base';
import { UserCredentialsEntity } from './user-credentials.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @OneToOne(() => UserCredentialsEntity, (credentials) => credentials.user, {
    cascade: true,
  })
  @JoinColumn()
  credentials: UserCredentialsEntity;
  @Column({ nullable: true })
  photo: string;
}
