import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, lastValueFrom, map, Observable, of } from 'rxjs';
import { Rent } from 'src/models/rent';

@Injectable()
export class RentService {

    constructor(
        private readonly http: HttpService,
    ) {

    }

    private path = process.env.RENT_URL;

    public getRent(): Promise<Rent[]> {
        const url = this.path + '/rent';
        return lastValueFrom(this.http.get(url).pipe(
            map(res => res.data),
            // catchError(e => of(null))
        ));
    }

    public getUserRent(id: string): Promise<Rent[]> {
        const url = this.path + '/rent';
        // блабла добавить хедеры
        
        return lastValueFrom(this.http.get(url, {headers: {
            'X-User-Name': id,
        }}).pipe().pipe(
            map(res => res.data),
            // catchError(e => of(null))
        ));
    }


    public getScooterRent(id: string): Promise<Rent[]> {
        const url = this.path + '/rent/scooter';
        
        return lastValueFrom(this.http.get(url, {headers: {
            'X-Scooter-Name': id,
        }}).pipe().pipe(
            map(res => res.data),
            // catchError(e => of(null))
        ));
    }

    public createRent(rent: Rent, username: string) {
        const url = this.path + '/rent';

        return lastValueFrom(this.http.post(url, rent, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

    public getRentById(id: string): Promise<Rent> {
        const url = this.path + '/rent/' +  id;
        return lastValueFrom(this.http.get(url).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

    public setRentStatus(username, uid,  status) {
        const url = this.path + `/rent/${uid}`;

        return this.http.patch<Rent>(url, {status} ,  {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data),
            catchError(e => of(null))
        );
    }

}
