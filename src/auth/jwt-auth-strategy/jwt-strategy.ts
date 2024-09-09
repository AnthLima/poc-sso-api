import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWTIfExistsCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    private static extractJWTIfExistsCookie(req: Request | any): string | null {
        return req?.cookies?.jwt || null;
    }

    async validate(payload: any) {
        return {
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            picture: payload.picture,
        };
    }
}
