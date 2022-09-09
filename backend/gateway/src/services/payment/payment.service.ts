import { HttpService } from '@nestjs/axios';
import {  Injectable } from '@nestjs/common';
import { map, catchError, of, lastValueFrom } from 'rxjs';
import { Payment } from 'src/models/payment';

@Injectable()
export class PaymentService {
    constructor(
        private readonly http: HttpService,
    ) {
    }

    private path = process.env.PAYMENT_URL;

    public getPayment(username:string, paymentId: string) {
        const url = this.path + `/payment/${paymentId}`;

        return lastValueFrom(this.http.get<Payment>(url, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

    public createPayment(username:string, payment: Payment) {
        const url = this.path + `/payment`;


        return lastValueFrom(this.http.post<Payment>(url, payment, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }

    public changePaymentState(username, uid, status) {
        const url = this.path + `/payment/${uid}`;

        return lastValueFrom(this.http.patch<Payment>(url,{status}, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data),
            catchError(e => of(null))
        ));
    }
}
