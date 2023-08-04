import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  //Session
  const redisClient = new Redis(
    +process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    { password: process.env.REDIS_PASSWORD },
  );
  redisClient.on('error', (err) => {
    logger.error(err);
  });
  redisClient.on('connect', () => {
    logger.verbose('Connection to redis establish successfully');
  });
  const redisStore = new RedisStore({ client: redisClient });
  app.use(
    session({
      store: redisStore,
      name: process.env.REDIS_AUTH_TOKEN_SESSION,
      secret: process.env.REDIS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 60000,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // ---- Session
  //Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors): BadRequestException => {
        return new BadRequestException(
          errors
            .map((error) => {
              return Object.entries(
                error.constraints ?? error.children[0].constraints,
              )
                .map((entry) => entry[1])
                .join();
            })
            .join(', '),
        );
      },
    }),
  );
  await app.listen(process.env.PORT);
  logger.verbose(`Server started on port ${process.env.PORT}`);
}

bootstrap();
