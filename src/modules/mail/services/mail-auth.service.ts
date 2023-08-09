import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TransportHelper } from '../helpers';

@Injectable()
export class MailAuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly transportHelper: TransportHelper,
  ) {}

  public async resetPassword(to: string, url: string, username: string) {
    await this.transportHelper.setTransport();
    try {
      await this.mailerService.sendMail({
        transporterName: 'gmail',
        from: '"Support Team" <support@example.com>',
        to,
        subject: 'Password Reset Request',
        template: './reset-password',
        context: {
          url,
          username,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  public async confirmAccount(to: string, url: string, username: string) {
    await this.transportHelper.setTransport();
    try {
      await this.mailerService.sendMail({
        transporterName: 'gmail',
        to,
        from: '"Support Team" <support@example.com>',
        subject: 'Account Confirmation',
        template: './confirm-account',
        context: {
          url,
          username,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
