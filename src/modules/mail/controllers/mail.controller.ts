import { Controller, Get } from '@nestjs/common';
import { MailAuthService } from '../services';

@Controller('mail')
export class MailController {
  constructor(private readonly mailingService: MailAuthService) {}

  @Get()
  async sendMail() {
    return this.mailingService.confirmAccount(
      'auth.server.test.my@gmail.com',
      'http://localhost:8000',
      'Oleksandr',
    );
  }
}
