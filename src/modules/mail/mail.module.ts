import { Module } from '@nestjs/common';
import { MailAuthService } from './services';
import { MailController } from './controllers';
import { MailerModule } from '@nestjs-modules/mailer';
import { TransportHelper } from './helpers';
import { MAIL_CONFIG } from './config';

@Module({
  imports: [MailerModule.forRoot(MAIL_CONFIG)],
  controllers: [MailController],
  providers: [MailAuthService, TransportHelper],
  exports: [MailAuthService],
})
export class MailModule {}
