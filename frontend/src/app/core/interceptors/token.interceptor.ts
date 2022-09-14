import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
) {}


private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl(`/auth`);
        return of(err.message);
    }
    if (err.status === 403) {
      this.router.navigateByUrl('/');
      return of(err.message);
    }
    return throwError(err);
}

public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
): Observable<HttpEvent<unknown>> {
    if (!this.authService.getJwtToken()) {
        return next.handle(request);
    }

    const tokenizedRequest = request.clone({
        setHeaders: {
            token: this.authService.getJwtToken() ?? ``,
        },
    });
    return next.handle(tokenizedRequest).pipe(catchError((x: HttpErrorResponse) => this.handleAuthError(x)));
}
}
