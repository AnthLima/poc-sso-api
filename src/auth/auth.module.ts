import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google-oauth-strategy/google.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }), 
    ConfigModule.forRoot()
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, JwtService],
  exports: [],
})
export class AuthModule {}
