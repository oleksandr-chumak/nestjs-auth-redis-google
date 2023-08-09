import { Module } from '@nestjs/common';
import {
  AuthService,
  CryptService,
  UserAuthProviderService,
  UserJwtService,
  UserService,
} from './services';
import { AuthController, UserController } from './controllers';
import { GoogleStrategy, LocalStrategy } from './strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthProvidersRepository, UserRepository } from './repositories';

@Module({
  imports: [PassportModule, JwtModule],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    CryptService,
    LocalStrategy,
    GoogleStrategy,
    UserJwtService,
    UserRepository,
    UserService,
    UserAuthProvidersRepository,
    UserAuthProviderService,
  ],
  exports: [UserJwtService],
})
export class AuthModule {}
