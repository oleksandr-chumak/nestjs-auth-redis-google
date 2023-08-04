import { JwtSignOptions } from '@nestjs/jwt';
import * as process from 'process';

export const refreshTokenConfig: JwtSignOptions = {
  secret: process.env.REFRESH_TOKEN_SECRET,
  expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
};
