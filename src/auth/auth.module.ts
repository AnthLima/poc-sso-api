import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-auth-strategy/jwt-strategy';
import { JwtAuthGuard } from './jwt-auth-strategy/jwt-auth-guard';
import { GoogleStrategy } from './google-oauth-strategy/google.strategy';
import { AzureADStrategy } from './azure-ad-auth-strategy/azure-ad-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, GoogleStrategy, AzureADStrategy],
  exports: [JwtAuthGuard, AuthService, JwtModule],
})
export class AuthModule {}
