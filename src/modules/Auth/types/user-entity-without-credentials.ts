import { UserEntity } from '../entities/user.entity';

export type UserEntityWithoutCredentials = Omit<UserEntity, 'password'>;
