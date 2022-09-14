import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private readonly admin: AdminService,
  ) { }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const stats = this.admin.getStats()
    return Boolean(stats);
  }

}
