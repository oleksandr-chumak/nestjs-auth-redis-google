import { UserEntity } from '../entities';

export type UserEntityWithoutCredentials = Omit<UserEntity, 'credentials'>;
