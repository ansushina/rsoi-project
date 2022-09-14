import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Stats } from 'src/app/models/stats';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private url = `${environment.baseUrl}`;

  constructor(private http: HttpClient, private readonly router: Router) {
  }

  public getStats(): Observable<Stats> {
    return this.http.get<Stats>(`${this.url}/stats/`);
  }

}
