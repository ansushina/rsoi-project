import { Body, Get, HttpService, Injectable, Post } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class StatisticService {

    constructor(
        private readonly http: HttpService,
    ) {

    }

    private path = process.env.SCOOTER_URL;

    async sendUserStatistic(
        user_uid: string,
        date: string,
    ) {
        const url = this.path + '/user-reg/';

        return lastValueFrom(this.http.post(url, { user_uid, date }).pipe(
            map(res => res.data),
            // catchError(e => of(null))
        ));
    }

    async sendRetnStats(

        rent_uid: string,
        duration: string,
    ) {
        const url = this.path + '/rent-created/';

        return lastValueFrom(this.http.post(url, {  rent_uid, duration }).pipe(
            map(res => res.data),
            // catchError(e => of(null))
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
