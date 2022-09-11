import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  public constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }

  public canActivate() {
    if (!this.auth.logIn) {
      return true;
    } else {
      return this.router.parseUrl(`/`);
    }
  }

}
