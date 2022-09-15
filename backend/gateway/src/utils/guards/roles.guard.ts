import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private auth: AuthService
  ) { }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    const token = request.headers?.token || request.handshake?.query?.token;
    try {
      const userInfo = await this.auth.isUserTokenValid(token);
      if (!userInfo) return false; 
      const { user_role } = userInfo 

      if (roles && (!user_role || !token || roles.findIndex(r => r === user_role) < 0))
        return false;
      else {
        return true;
      }
    } catch (e) {
      throw(e);
    }
  }
}

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);