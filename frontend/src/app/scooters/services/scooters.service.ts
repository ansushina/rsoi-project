import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Scooter } from 'src/app/models/scooter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScootersService {
  private readonly serverURL = `${environment.baseUrl}/`;

  public constructor(private readonly http: HttpClient) { }

  public getScooters(page: number, pageSize: number) {

    let params = new HttpParams();

    params = params.append('page', page);
    params = params.append('size', pageSize);
    return this.http.get<{items: Scooter[], totalElements: number}>(`${this.serverURL}scooters`, {
      params
    }).pipe(
    );
  }

  public createScooter(Scooter: Scooter) {
    return this.http.post<Scooter>(`${this.serverURL}scooters`, Scooter);
  }

  public replaceScooter(Scooter: Scooter) {
    return this.http.put<Scooter>(`${this.serverURL}scooters/${Scooter.uid}`, Scooter);
  }


  public deleteScooter(ScooterId: string) {
    return this.http.delete(`${this.serverURL}scooters/${ScooterId}`);
  }
}
