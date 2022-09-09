import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class SameUserGuard implements CanActivate {
  constructor(
      private auth: AuthService
      ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const paramsUserId = request.params?.id; 
    const token = headers.token;

    try {
      const userInfo = await this.auth.isUserTokenValid(token);
      if (!userInfo) return false; 
      const {uid} = userInfo;
      return paramsUserId === uid;
    } catch (e) {
      return false;
    }
  }
}