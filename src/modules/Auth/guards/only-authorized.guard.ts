import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserJwtService, UserService } from '../services';
import {
  InvalidTokenException,
  TokenNotFoundException,
  UserNotFoundException,
} from '../exceptions';

@Injectable()
export class OnlyAuthorizedGuard implements CanActivate {
  constructor(
    private readonly jwtService: UserJwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    //@ts-ignore
    const accessToken: string = request.session.authorization;
    if (!accessToken) {
      throw new TokenNotFoundException();
    }
    const payload = await this.jwtService.verifyAccessToken(accessToken);
    console.log(payload);
    if (!payload) {
      throw new InvalidTokenException();
    }
    const user = await this.userService.findOneBy({
      id: payload.id,
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    request.user = user;

    return true;
  }
}
