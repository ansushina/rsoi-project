import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Stats } from 'src/app/models/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsResolverResolver implements Resolve<Stats> {

  constructor(
    private readonly admin: AdminService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.admin.getStats();
  }
}
