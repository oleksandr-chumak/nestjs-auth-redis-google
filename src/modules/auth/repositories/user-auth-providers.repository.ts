import { DataSource, Repository } from 'typeorm';
import { UserAuthProviderEntity } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthProvidersRepository extends Repository<UserAuthProviderEntity> {
  constructor(private dataSource: DataSource) {
    super(UserAuthProviderEntity, dataSource.createEntityManager());
  }
}
