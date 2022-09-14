import { Body, Get, Injectable, Post } from '@nestjs/common';
import { catchError, lastValueFrom, map, of } from 'rxjs';

import { HttpService } from '@nestjs/axios';

@Injectable()
export class StatisticService {

    constructor(
        private readonly http: HttpService,
    ) {
        console.log(this.path)
    }

    private path = process.env.STATS_URL;

    async sendUserStatistic(
        user_uid: string,
        date: string,
    ) {
        const url = this.path + '/user-reg/';

        return lastValueFrom(this.http.post(url, { user_uid, date }).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

    async sendRetnStats(

        rent_uid: string,
        duration: string,
    ) {
        const url = this.path + '/rent-created/';

        return lastValueFrom(this.http.post(url, {  rent_uid, duration }).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

    async getStats() {
        
        const url = this.path + '/stats/';

        return lastValueFrom(this.http.get(url).pipe(
            map(res => res.data),
            // catchError(e => of(null))
        ));
    }
}
