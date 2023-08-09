import { Injectable } from '@nestjs/common';
import { OAuth2ClientConfig } from '../config/oauth2-client.config';
import { Options } from 'nodemailer/lib/smtp-transport';
import { MailerService } from '@nestjs-modules/mailer';
import { OAuth2Client } from 'google-auth-library';
import * as process from 'process';

@Injectable()
export class TransportHelper {
  private _oAuth2Client: OAuth2Client;

  constructor(private readonly mailerService: MailerService) {
    this._oAuth2Client = new OAuth2Client(OAuth2ClientConfig);
    this._oAuth2Client.setCredentials({
      refresh_token: process.env.GMIAL_REFRESH_TOKEN,
    });
  }

  public async setTransport() {
    const accessToken = await this.getAccessToken();
    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  private async getAccessToken() {
    try {
      const tokenInfo = await this._oAuth2Client.getAccessToken();
      // return access token
      return tokenInfo.token;
    } catch (err) {
      throw new Error(
        'Unauthorized: Unable to create access token for Gmail API.' + err,
      );
    }
  }
}
