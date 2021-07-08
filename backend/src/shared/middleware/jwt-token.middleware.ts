import { IJwtPayload } from '@auth/interfaces/jwt-payload';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtTokenMiddleware implements NestMiddleware {
  constructor(protected readonly _jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    req.locals = req.locals || {};
    req.locals.user = null;

    const token: string = this.getBearerToken(req);

    if (token) {
      try {
        const isTokenValid = this.verifyToken(token);

        if (isTokenValid) {
          const payload: IJwtPayload = this.getTokenPayload(token);
          req.locals.user = {
            id: payload.userId,
            email: payload.email,
            roles: payload.roles,
          };
        }
      } catch (err) {
        throw new HttpException('Token: jwt expired', HttpStatus.UNAUTHORIZED);
      }
    }

    next();
  }

  private getTokenPayload(token: string): IJwtPayload {
    const decodedToken: any = jwt.decode(token, { complete: true });
    return decodedToken.payload;
  }

  private verifyToken(token: string): boolean {
    return !!this._jwtService.verify(token);
  }

  private getBearerToken(req: Request): string {
    try {
      return req.headers.authorization.split(' ')[1];
    } catch (error) {
      return null;
    }
  }
}
