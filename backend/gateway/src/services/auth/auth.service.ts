import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, Observable, of } from 'rxjs';
import { Session, SessionDto } from 'src/models/session';
import { User, UserRole } from 'src/models/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    
    private path = process.env.SESSIONS_URL;

    public constructor(
        public http: HttpService,
    ) {}

    public async isUserTokenValid(token: string) {
        const session = await this.getSessionWithErrors(token);
        if (!session) return false;
        const user = await this.getUserById(session.user_uid);
        if (!user) return false;
        if (user.user_role !== session.user_role) {
            return false;
        }
        return user;
    }

    public getSessionWithErrors(token: string) {
        const url = this.path + '/sessions/' + token;

        return lastValueFrom(this.http.get(url).pipe(
            map(res => res.data),
            catchError(e => {
                if (e.response?.status && e.response?.status !== 500) {
                    return of(null);
                } 
                throw new HttpException('Sessions service is not available', 500);
            }))
        );
    }

    public getSessionByToken(token: string): Promise<Session> {
        const url = this.path + '/sessions/' + token;

        return lastValueFrom(this.http.get(url).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

    public getUserById(userId: string): Promise<User> {
        const url = this.path + '/users/' + userId;

        return lastValueFrom(this.http.get(url).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

    public createUser(user:  User) {
        const url = this.path + '/users/';

        return lastValueFrom(this.http.post(url, user).pipe(
            map(res => res.data),
            catchError(e => {
                throw new HttpException(e.response.data, e.response.status);
              }),
        ));
    }

    public createSession(session: SessionDto) {

        const url = this.path + '/sessions/';

        return lastValueFrom(this.http.post(url, session).pipe(
            map(res => res.data),
            catchError(e => {
                throw new HttpException(e.response?.data, e.response.status);
            }),
        ));
    }

    public deleteSession(sessionId: string) {
        const url = this.path + '/sessions/' + sessionId;

        return lastValueFrom(this.http.delete(url).pipe(
            map(res => res.data),
            catchError(e => {
                throw new HttpException(e.response.data, e.response.status);
              }),
        ));
    }
}
