import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { UserEntity } from '../entities';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  SaveOptions,
} from 'typeorm';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOneBy(where: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(where);
  }

  findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(options);
  }

  findUserByEmail(email: string, relations?: FindOptionsRelations<UserEntity>) {
    return this.userRepository.findOne({
      where: { email },
      relations,
    });
  }

  save(entities: DeepPartial<UserEntity>, options?: SaveOptions) {
    return this.userRepository.save(entities, options);
  }

  createQueryBuilder(alias: string) {
    return this.userRepository.createQueryBuilder(alias);
  }
}
