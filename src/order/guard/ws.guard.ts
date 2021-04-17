import { CanActivate, Injectable } from '@nestjs/common';
import { AuthService } from 'src/users/services/auht.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: any): boolean | any {
    try {
      console.log('Decoding token on socket connection request');
      const bearerToken = context.args[0].handshake.query.token;
      const decoded = this.authService.decodeToken(bearerToken);
      return decoded == null ? null : decoded;
    } catch (ex) {
      console.error(ex);
      // console.trace(ex);
      return false;
    }
  }
}
