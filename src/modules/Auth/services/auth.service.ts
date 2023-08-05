import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { CryptService } from './crypt.service';
import { UserEntityWithoutCredentials } from '../types';
import { RegisterUserDto } from '../dto';
import {
  PasswordNotMatchException,
  UserAlreadyExistException,
} from '../exceptions';
import { ExternalUser } from '../types';
import { ProviderName } from '../enum';
import { UserEntity } from '../entities';
import { UserAuthProviderService } from './user-auth-provider.service';
import { DeepPartial } from 'typeorm';
import { Provider } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptService: CryptService,
    private readonly userAuthProviderService: UserAuthProviderService,
  ) {}

  //Create a new user if they don't exist; if they do exist, create a new provider.
  public async externalUser(user: ExternalUser, providerName: ProviderName) {
    const foundUser = await this.userService.findUserByEmail(user.email, {
      credentials: true,
    });
    const provider: Provider = {
      providerId: user.id,
      providerName,
      userInternalName: user.username,
    };
    if (!foundUser) {
      const { id } = await this.createUserWithProvider(user, provider);
      return id;
    }
    const isUserExistWithCurrentProvider = await this.findUserWithProvider(
      foundUser.id,
      providerName,
    );
    if (!isUserExistWithCurrentProvider) {
      await this.userAuthProviderService.createProvider(
        provider,
        foundUser.credentials,
      );
    }
    return foundUser.id;
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntityWithoutCredentials | null> {
    const user = await this.userService.findUserByEmail(email, {
      credentials: true,
    });
    const hashedPassword = user.credentials.password;
    if (user && (await this.cryptService.compare(password, hashedPassword))) {
      const { credentials: _, ...result } = user;
      return result;
    }
    return null;
  }

  public async registerUser(user: RegisterUserDto) {
    const foundUser = await this.userService.findUserByEmail(user.email);
    if (foundUser) {
      throw new UserAlreadyExistException();
    }
    if (user.password !== user.confirmPassword) {
      throw new PasswordNotMatchException();
    }
    const newUser = await this.createUserWithCredentials(user);
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  private findUserWithProvider(
    userId: string,
    providerName: ProviderName,
  ): Promise<UserEntity> {
    const queryBuilder = this.userService
      .createQueryBuilder('user')
      .innerJoin('user.credentials', 'uc', 'uc.id = user.credentialsId')
      .leftJoin('user_auth_provider', 'uap', 'uap.credentialsId = uc.id')
      .where('user.id = :userId', { userId })
      .andWhere('uap.providerName = :providerName', { providerName });
    return queryBuilder.getOne();
  }

  private async createUserWithCredentials(
    user: RegisterUserDto,
  ): Promise<DeepPartial<UserEntity>> {
    return this.userService.save({
      email: user.email,
      username: user.username,
      credentials: {
        password: await this.cryptService.hash(user.password),
      },
    });
  }
  private createUserWithProvider(
    user: ExternalUser,
    provider: Provider,
  ): Promise<DeepPartial<UserEntity>> {
    return this.userService.save({
      username: user.username,
      email: user.email,
      photo: user.photo,
      credentials: { providers: [{ ...provider }] },
    });
  }
}
