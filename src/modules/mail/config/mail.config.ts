import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

console.log(join(__dirname, '..', 'templates'));
export const MAIL_CONFIG = {
  transport: 'smtps://user@domain.com:pass@smtp.domain.com',
  template: {
    dir: join(__dirname, '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
