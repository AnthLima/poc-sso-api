import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OIDCStrategy } from 'passport-azure-ad';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AzureADStrategy extends PassportStrategy(OIDCStrategy, 'azure-ad') {
  constructor(private readonly authService: AuthService, configService: ConfigService ) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${configService.get<string>('AZURE_TENANT_ID')}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get<string>('AZURE_CLIENT_ID'),
      responseType: 'code',
      responseMode: 'form_post',
      redirectUrl: 'https://localhost:3000/auth/azure-ad/callback',
      clientSecret: configService.get<string>('AZURE_CLIENT_SECRET'),
      validateIssuer: false,
      passReqToCallback: false,
      scope: ['profile', 'email', 'openid', 'https://graph.microsoft.com/User.Read'],
    });
  }

  async validate(iss, sub, profile, accessToken, refreshToken, done): Promise<any> {
    const jwtPayload = {
      username: profile.displayName,
      email: profile.emails[0],
      accessToken,
      refreshToken,
    };

    done(null, jwtPayload);
  }
}
