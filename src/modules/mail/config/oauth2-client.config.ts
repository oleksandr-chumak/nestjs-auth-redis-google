import * as process from 'process';
import { OAuth2ClientOptions } from 'google-auth-library';

export const OAuth2ClientConfig: OAuth2ClientOptions = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'https://developers.google.com/oauthplayground',
};
