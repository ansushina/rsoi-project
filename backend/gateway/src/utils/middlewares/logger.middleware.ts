import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  constructor(
    private auth: AuthService,
  ) { }

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const token = request.headers?.token?.toString() || '';

    const start = Date.now();

    response.on('finish', async () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      let userInfoString = '';

      try {
        const userInfo = await this.auth.isUserTokenValid(token);
        if (userInfo) {
          const { user_role, uid } = userInfo;
          userInfoString = `(${user_role} ${uid}) `;
        }
      } catch (e) {
      }

      this.logger.log(
        userInfoString +
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} Time: ${Date.now() - start}ms`,
      );
    });

    next();
  }
}
