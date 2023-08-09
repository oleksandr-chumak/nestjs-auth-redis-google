import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../entities';

export const CurrentUser = createParamDecorator<UserEntity>((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
