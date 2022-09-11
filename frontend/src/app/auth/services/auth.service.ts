import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { Session, SessionDto } from 'src/app/models/session';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.baseUrl}`;


  private _isAuth = new BehaviorSubject(Boolean(localStorage.getItem('user-token')));

  public isAuth$ = this._isAuth.asObservable();

  constructor(private http: HttpClient, private readonly router: Router) {
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
    return this.http.get<User>(`${this.url}/users/${username}/`, { headers: myHeaders });
  }

  public updateUser(username: string, source: User): Observable<User> {
    let myHeaders;
    if (localStorage.getItem('user-token')) {
      myHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('user-token'),
      });
    }
    return this.http.patch<User>(`${this.url}/users/${username}/`, source, { headers: myHeaders });
  }

  public login(login: string, password: string): Observable<Session> {
    const source = {
      login,
      password,
      user_role: 'user',
    } as SessionDto;
    console.log(source)
    console.log(this.url)
    return this.http.post<Session>(`${this.url}/sessions/`, source).pipe(
      tap(session => {
        localStorage.setItem('user-token', session.jwt);
        localStorage.setItem('username', session.user_uid);
        localStorage.setItem('login', login);
        localStorage.setItem('id', session.uid);
        this._isAuth.next(true);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('user-token');
    localStorage.removeItem('username');
    localStorage.removeItem('login');
    localStorage.removeItem('id');
    this._isAuth.next(false);
    this.router.navigateByUrl('/auth')
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
