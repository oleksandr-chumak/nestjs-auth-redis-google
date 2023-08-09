import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth';
import { MailModule } from './modules/mail';
import { DATABASE_CONFIG } from '@common/config';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), AuthModule, MailModule],
})
export class AppModule {}
