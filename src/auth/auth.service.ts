import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateJwt(user: any) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    return {
      access_token: this.jwtService.sign(payload, { secret }),
    };
  }

  async generateJWTByAzureAd(user: any) {
    const  payload = {
      username: user.displayName,
      email: user.emails[0],
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    return {
      access_token: this.jwtService.sign(payload, { secret }),
    };
  }
}
