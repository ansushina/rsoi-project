import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { RentService } from 'src/app/rent/services/rent.service';

@Injectable({
  providedIn: 'root'
})
export class NonRentedGuard implements CanActivate {

  public constructor(
    private readonly rent: RentService,
    private readonly router: Router,
  ) { }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    try {
      const rents = await lastValueFrom(this.rent.getUserRent());


      const result = rents.find(rent => rent.status === 'started');

      if (result) {
        return this.router.parseUrl(`/rent/${result.uid}`);
      } else {
        return true;
      }
    } catch {
      return this.router.parseUrl('/')
    }
  }

}
