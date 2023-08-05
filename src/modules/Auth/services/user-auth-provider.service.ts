import { Injectable } from '@nestjs/common';
import { UserAuthProvidersRepository } from '../repositories';
import { UserCredentialsEntity } from '../entities';
import { Provider } from '../interfaces';

@Injectable()
export class UserAuthProviderService {
  constructor(
    private readonly userAuthProviderRepository: UserAuthProvidersRepository,
  ) {}

  createProvider(provider: Provider, credentials: UserCredentialsEntity) {
    return this.userAuthProviderRepository.insert({
      ...provider,
      credentials,
    });
  }
}
