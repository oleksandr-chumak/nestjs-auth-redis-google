import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';

const dir = process.cwd() + '/src' + '/modules' + '/Maling' + '/templates/';
export const MAILER_CONFIG: MailerOptions = {
  transport: 'smtps://user@domain.com:pass@smtp.domain.com',
  template: {
    dir: process.cwd() + '/src' + '/modules' + '/Maling' + '/templates/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
