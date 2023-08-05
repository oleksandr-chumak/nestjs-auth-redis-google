import { ProviderName } from '../enum';

export interface Provider {
  providerId: string;
  providerName: ProviderName;
  userInternalName: string;
}
