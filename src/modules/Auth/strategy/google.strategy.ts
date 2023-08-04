import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services';
import { GOOGLE_CONF } from '../config';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: GOOGLE_CONF.CLIENT_ID,
      clientSecret: GOOGLE_CONF.CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/login/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleUser,
    done: VerifyCallback,
  ) {
    const user = {
      id: profile.id,
      email: profile.emails[0].value,
      username: profile.displayName,
      photo: profile.photos[0].value,
    };

    done(null, user);
  }
}
