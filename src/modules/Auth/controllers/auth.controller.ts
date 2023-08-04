import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard, LocalAuthGuard } from '../guards';
import { LoginUserDto, RegisterUserDto, UserAuthRefreshTokenDto } from '../dto';
import { AuthService, UserJwtService } from '../services';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: UserJwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Body() user: LoginUserDto) {
    const id: string = req.user.id;
    const tokens = await this.jwtService.generateTokens({ id });
    req.session.authorization = tokens.accessToken;
    return {
      refreshToken: tokens.refreshToken,
    };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/login/google')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('/login/google/callback')
  googleCallback(@CurrentUser() user) {
    return user;
  }

  @Post('register')
  register(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @Post('/refresh')
  async refreshAccess(@Req() req, @Body() data: UserAuthRefreshTokenDto) {
    req.session.authorization =
      await this.jwtService.generateAccessTokenByRefreshToken(
        data.refreshToken,
      );
  }
}
