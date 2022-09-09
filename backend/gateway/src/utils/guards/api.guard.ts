import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private auth: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.token || request.handshake?.query?.token;

    try {
      if (!token)
        return false;
      else
        return Boolean(await this.auth.isUserTokenValid(token.toString()));
    } catch (e) {
      return false;
    }
  }
}
