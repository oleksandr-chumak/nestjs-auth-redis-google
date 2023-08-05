import { Column, Entity, ManyToOne } from 'typeorm';
import { UserCredentialsEntity } from './user-credentials.entity';
import { ProviderName } from '../enum';
import { BaseEntity } from '@common/base';

@Entity('user_auth_provider')
export class UserAuthProviderEntity extends BaseEntity {
  @Column()
  providerId: string;
  @Column()
  providerName: ProviderName;
  @ManyToOne(
    () => UserCredentialsEntity,
    (credentials) => credentials.providers,
  )
  credentials: UserCredentialsEntity;
  @Column()
  userInternalName: string;
}
