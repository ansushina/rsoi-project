import { Injectable, Logger } from '@nestjs/common';
import { catchError, lastValueFrom, map, Observable, of, tap } from 'rxjs';

import { HttpService } from '@nestjs/axios';

import { Scooter } from 'src/models/scooter';


@Injectable()
export class ScootersService {
    constructor(
        private readonly http: HttpService,
    ) {

    }

    private path = process.env.SCOOTER_URL;

    public getScooters(page, pageSize): Promise<Scooter[]> {
        const url = this.path + '/scooters';
        Logger.log(`${url} ${page} ${pageSize}`)
        
        const params = new URLSearchParams()
        params.set('page', page);
        params.set('size', pageSize);


        return lastValueFrom(this.http.get(url, {params}).pipe(
            map(res => res.data),
            // catchError(e => of(null))
        ));
    } 

    public getScooterById(id: string): Promise<Scooter> {
        const url = this.path + '/scooters/' + id;

        return lastValueFrom(this.http.get(url).pipe(
            map(res => res.data),
            // catchError(e => of(null))
        ));
    } 


    public updateScooterStatus(uid: string, availability: boolean) {
        const url = this.path + '/scooters/' + uid;

        return lastValueFrom(this.http.patch(url, {uid, availability}).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

}
