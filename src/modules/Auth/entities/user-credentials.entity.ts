import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserAuthProviderEntity } from './user-auth-provider.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from '@common/base';

@Entity('user_credentials')
export class UserCredentialsEntity extends BaseEntity {
  @Column({ nullable: true })
  password: string;
  @OneToOne(() => UserEntity, (user) => user.credentials)
  user: UserEntity;
  @OneToMany(() => UserAuthProviderEntity, (provider) => provider.credentials, {
    cascade: true,
  })
  @JoinColumn()
  providers: UserAuthProviderEntity[];
}
