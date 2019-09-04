import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization) {
      return false;
    }
    await this.validateToken(authorization);
    return true;
  }

  async validateToken(auth: string) {
    const [bearer, token] = auth.split(' ');
    if (bearer !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    try {
      const decode = await verify(token, process.env.SECRET);
      return decode;
    } catch (error) {
      const message = `Token error: ${error.message || error.name}`;
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
