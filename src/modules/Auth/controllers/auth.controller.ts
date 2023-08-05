import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard, LocalAuthGuard } from '../guards';
import { LoginUserDto, RegisterUserDto, UserAuthRefreshTokenDto } from '../dto';
import { AuthService, UserJwtService } from '../services';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GoogleUser } from '../interfaces';
import { ProviderName } from '../enum';

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
  async googleCallback(@Req() req, @CurrentUser() user: GoogleUser) {
    const userId = await this.authService.externalUser(
      user,
      ProviderName.GOOGLE,
    );
    const tokens = await this.jwtService.generateTokens({ id: userId });
    req.session.authorization = tokens.accessToken;
    return {
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('register')
  register(@Body() user: RegisterUserDto): Promise<any> {
    return this.authService.registerUser(user);
  }

  @Post('/refresh')
  async refreshAccess(
    @Req() req,
    @Body() data: UserAuthRefreshTokenDto,
  ): Promise<void> {
    req.session.authorization =
      await this.jwtService.generateAccessTokenByRefreshToken(
        data.refreshToken,
      );
  }
}
