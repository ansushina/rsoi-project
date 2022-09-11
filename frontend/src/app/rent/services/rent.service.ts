import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Rent } from 'src/app/models/rent';
import { Scooter } from 'src/app/models/scooter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private readonly serverURL = `${environment.baseUrl}/`;

  public constructor(private readonly http: HttpClient) { }

  public getUserRent() {
    return this.http.get<Rent[]>(`${this.serverURL}rent`).pipe(
    );
  }

  public getRent(id: string) {
    return this.http.get<Rent>(`${this.serverURL}rent/${id}`).pipe(
    );
  }

  public createRent(dateFrom: Date, scooterId: string) {
    return lastValueFrom(this.http.post<Rent>(`${this.serverURL}rent`, {
      startDate: dateFrom.toISOString(),
      // endDate: dateTo,
      scooterUid: scooterId,
    }))
  }


  public deleteRent(uid: string) {
    return this.http.delete(`${this.serverURL}rent/${uid}`)
  }

  public stopRent(uid: string) {
    return lastValueFrom(this.http.post(`${this.serverURL}rent/${uid}/finish`, {}))
  }
}
