import { Module , NestModule, MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProtectedModule } from './protected/protected.module';
import { CacheMiddleware } from './cache-middleware/cache-middleware-strategy';
@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot(),
    ProtectedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CacheMiddleware)
      .forRoutes('protected');
  }
}
