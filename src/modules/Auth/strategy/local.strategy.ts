import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services';
import { UserEntityWithoutCredentials } from '../types';
import { InvalidCredentialsException } from '../exceptions';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserEntityWithoutCredentials> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    return user;
  }
}
