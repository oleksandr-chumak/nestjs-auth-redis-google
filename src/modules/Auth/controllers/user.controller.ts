import { Controller, Get, UseGuards } from '@nestjs/common';
import { OnlyAuthorizedGuard } from '../guards';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('user')
export class UserController {
  @UseGuards(OnlyAuthorizedGuard)
  @Get('/me')
  getMe(@CurrentUser() user) {
    return user;
  }
}
