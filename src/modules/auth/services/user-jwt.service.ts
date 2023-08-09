import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload, Tokens } from '../interfaces';
import { accessTokenConfig, refreshTokenConfig } from '../config';
import * as process from 'process';
import { InvalidTokenException } from '../exceptions';

@Injectable()
export class UserJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload, accessTokenConfig);
  }

  generateRefreshToken(payload: Payload) {
    return this.jwtService.signAsync(payload, refreshTokenConfig);
  }

  async generateTokens(payload: Payload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  verifyAccessToken(token: string): Promise<Payload | null> {
    try {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      return this.jwtService.verify(token, { secret });
    } catch (e) {
      return null;
    }
  }

  verifyRefreshToken(token: string): Promise<Payload | null> {
    try {
      const secret = process.env.REFRESH_TOKEN_SECRET;
      return this.jwtService.verify(token, { secret });
    } catch (e) {
      return null;
    }
  }

  async generateAccessTokenByRefreshToken(
    refreshToken: string,
  ): Promise<string> {
    const payload = await this.verifyRefreshToken(refreshToken);
    console.log(payload);
    if (!payload) {
      throw new InvalidTokenException();
    }
    return this.generateAccessToken({ id: payload.id });
  }
}
