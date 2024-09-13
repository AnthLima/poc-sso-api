import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { CacheMiddleware } from './cache-middleware/cache-middleware-strategy';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as https from 'https';
import * as express from 'express';

async function bootstrap() {
  console.log("Path to server.key:", join(__dirname, '../', 'server.key'));
  console.log("Path to server.cert:", join(__dirname, '../', 'server.cert'));

  const httpsOptions = {
    key: readFileSync(join(__dirname, '../', 'server.key')),
    cert: readFileSync(join(__dirname, '../', 'server.cert')),
  };
  console.log("HTTP OPTIONS: ", httpsOptions)

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(cors({
    origin: configService.get<string>('ORGIGIN_FOR_NO_CORS'),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

  app.use(cookieParser());

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(CacheMiddleware);

  const server = https.createServer(httpsOptions, app.getHttpAdapter().getInstance() as express.Application);

  const port = 3000;
  await new Promise<void>((resolve, reject) => {
    server.listen(port, () => {
      console.log(`Server is running on https://localhost:${port}`);
      resolve();
    });
    server.on('error', (err) => {
      console.error('Server error:', err);
      reject(err);
    });
  });
}

bootstrap();
