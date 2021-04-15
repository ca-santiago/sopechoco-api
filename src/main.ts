import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import { AppModule } from './app.module';
import * as path from 'path';
import * as express from 'express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static(path.join(__dirname, '../static')));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
