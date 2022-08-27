import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { HttpService } from '@nestjs/axios';

import { Scooter } from 'src/models/scooter';


@Injectable()
export class ScootersService {
    constructor(
        private readonly http: HttpService,
    ) {

    }

    private path = process.env.SCOOTER_URL;

    public getScooters(page, pageSize): Observable<Scooter[]> {
        const url = this.path + '/scooters';
        Logger.log(`${url} ${page} ${pageSize}`)
        
        const params = new URLSearchParams()
        params.set('page', page);
        params.set('size', pageSize);


        return this.http.get(url, {params}).pipe(
            map(res => res.data),
            catchError(e => of(null))
        );
    } 

}
