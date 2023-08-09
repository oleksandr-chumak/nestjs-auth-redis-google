import { JwtSignOptions } from '@nestjs/jwt';
import * as process from 'process';

export const accessTokenConfig: JwtSignOptions = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
};
