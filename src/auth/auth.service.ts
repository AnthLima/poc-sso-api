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
    const payload = { email: user.email, sub: user.id };
    const secret = this.configService.get<string>('JWT_SECRET');
    return {
      access_token: this.jwtService.sign(payload, { secret }),
    };
  }
}
