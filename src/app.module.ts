import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './common/config/database.config';
import { AuthModule } from './modules/Auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), AuthModule],
})
export class AppModule {}
