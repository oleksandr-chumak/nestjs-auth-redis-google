import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOneBy(where: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(where);
  }

  save(entities: DeepPartial<UserEntity>) {
    return this.userRepository.save(entities);
  }
}
