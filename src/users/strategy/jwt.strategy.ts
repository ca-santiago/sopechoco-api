import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: false,
    });
  }

  // decodeToken(token: string): Record<string, any> | null {
  //   try {
  //     const tokenPayload = this.jwtService.decode(token);

  //     if (!tokenPayload) return null;
  //     return tokenPayload as Record<string, null>;
  //   } catch (err) {
  //     return null;
  //   }
  // }

  // async authenticate(req: Request) {
  //   const tokenOrNull = this.decodeToken(
  //     ExtractJwt.fromAuthHeaderAsBearerToken()(req),
  //   );

  //   if (tokenOrNull) {
  //     return this.success(this.validate(tokenOrNull));
  //   }

  //   const refreshOrNull = this.decodeToken(
  //     ExtractJwt.fromHeader('refresh')(req),
  //   );

  //   if (!refreshOrNull) throw new UnauthorizedException();

  //   // Generate new tokens and return
  //   const newTokens = this.authService.generateCredentials(
  //     refreshOrNull as IUserPublicDTO,
  //   );
  //   req.headers['authorization'] = 'Bearer ' + newTokens.token;
  //   req.headers['refresh'] = newTokens.refreshToken;
  //   return this.success(this.validate(refreshOrNull));
  // }

  async validate(payload: any) {
    const { exp, iat, ...rest } = payload;
    return rest;
  }
}
