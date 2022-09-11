import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { Session, SessionDto } from 'src/app/models/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {
  }

  public createUser(source: User): Observable<User> {
    return this.http.post<User>(`${this.url}/users/`, source);
  }

  public getUser(username: string): Observable<User> {
    let myHeaders;
    if (localStorage.getItem('user-token')) {
      myHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('user-token'),
      });
    }
    return this.http.get<User>(`${this.url}/users/${username}/`, {headers: myHeaders});
  }

  public updateUser(username: string, source: User): Observable<User> {
    let myHeaders;
    if (localStorage.getItem('user-token')) {
      myHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('user-token'),
      });
    }
    return this.http.patch<User>(`${this.url}/users/${username}/`, source, {headers: myHeaders});
  }

  public login(login: string, password: string): Observable<Session> {
    const source = {
      login,
      password,
      user_role: 'user',
    } as SessionDto;
    console.log(source)
    console.log(this.url)
    return this.http.post<Session>(`${this.url}/sessions/`, source);
  }

  public logout(): void {
    localStorage.removeItem('user-token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('user-token') !== null);
  }

  public getJwtToken() {
    return (localStorage.getItem('user-token'));
  }

  public removeToken(): void {
    (localStorage.removeItem('user-token'));
  }


  public setToken(token: string) {
    localStorage.setItem('user-token', token);
  }
}
