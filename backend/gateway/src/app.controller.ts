import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Query, Req, ServiceUnavailableException } from '@nestjs/common';
import { AppService } from './app.service';
import { Payment } from './models/payment';
import { v4 as uuidv4 } from 'uuid';
import { ScootersService } from './services/scooters/scooters.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly scooters: ScootersService
    // @InjectQueue('queue1') private queue: Queue
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // а зачем мне все?
  @Get('/scooters')
  async getScooters(
    @Query('page') page: number,
    @Query('size') size: number
  ) {
    return this.scooters.getScooters(page, size).toPromise();
  }


  // доступные скутеры
  // @Get('/scooters/available')


  @Get('/me')
  async getMe(
    @Req() request: Request
  ) {
    // достать токен
    const username: string = request.headers['x-user-name']?.toString();
    if (!username) throw new  BadRequestException('username must be provided'); 

    // получить поездки
    // const reservations = await this.getAllReservations(username);

    // return {
    //   reservations,
    //   loyalty: {
    //     status: loyality.status,
    //     discount: loyality.discount,
    //   }
    // }
  }


  // private async getAllReservations(username) {
  //   const reservations = await this.reservation.getUserReservations(username).toPromise();
    
  //   const items = [];
  //   for (const r of reservations) {
  //     const p = await this.payment.getPayment(username, r.paymentUid).toPromise(); 
  //     items.push({
  //       ...r,
  //       startDate: moment(new Date(r.startDate)).format('YYYY-MM-DD'),
  //       endDate: moment(new Date(r.endDate)).format('YYYY-MM-DD'),
  //       paymentUid: undefined, 
  //       payment: p ? {
  //         status: p.status,
  //         price: p.price,
  //       } : {}
  //     })
  //   }
  //   return items;
  // }

  // пусть будут все проверим последнюю
  @Get('/reservations')
  async getReservations(
    @Req() request: Request
  ) { 
    // const username: string = request.headers['x-user-name']?.toString();
    // if (!username) throw new  BadRequestException('username must be provided'); 
    // return this.getAllReservations(username);
  }

  // аренда самоката
  @Post('/reservations/')
  @HttpCode(200)
  async createReservation(
    @Req() request: Request,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('hotelUid') hotelUid: string,
  ) { 

    // проверка токена 
    const username: string = request.headers['x-user-name']?.toString();
    if (!username) throw new  BadRequestException('username must be provided'); 
    
    // get скутер 

    // const hotel = await  this.reservation.getHotel(hotelUid).toPromise();
    // if (!hotel) {
    //   throw new ServiceUnavailableException('Reservation Service unavailable')
    // }

    // Logger.log(JSON.stringify(hotel))


    // payment 

    // const payment = {
    //   payment_uid: uuidv4(),
    //   status: 'PAID',
    //   price: resultPay,
    // } as Payment;

    // const p = await this.payment.createPayment(username, payment).toPromise();
    // if (!p) {
    //   throw new ServiceUnavailableException('Payment Service unavailable');
    // }
    
    // Logger.log(JSON.stringify(p))
    // reservation

    // const reservation = {
    //   reservation_uid: uuidv4(),
    //   hotel_id: hotelUid,
    //   payment_uid: payment.payment_uid,
    //   status: 'PAID',
    //   start_date: startDate,
    //   end_data: endDate,
    //   username,
    // } as Reservation;

    // // Logger.log(JSON.stringify(reservation))

    // const r = await this.reservation.createReservation(username, reservation).toPromise();

    // // Logger.log(JSON.stringify(r))
    // return {
    //   ...r, 
    //   startDate: moment(new Date(r.startDate)).format('YYYY-MM-DD'),
    //   endDate: moment(new Date(r.endDate)).format('YYYY-MM-DD'),
    //   discount: loyalty.discount,
    //   payment: {
    //     status: payment.status,
    //     price: payment.price,
    //   }
    // }
  }

  // @Get('/reservations/:reservationId')
  // async getReservationById(
  //   @Param('reservationId') uid: string,
  //   @Req() request: Request
  // ) {
  //   const username: string = request.headers['x-user-name']?.toString();
  //   if (!username) throw new  BadRequestException('username must be provided'); 

  //   const r = await this.reservation.getReservation(username, uid).toPromise(); 
  //   const p = await this.payment.getPayment(username, r.paymentUid).toPromise(); 

  //   return {
  //     ...r,
  //     startDate: moment(new Date(r.startDate)).format('YYYY-MM-DD'),
  //     endDate: moment(new Date(r.endDate)).format('YYYY-MM-DD'),
  //     paymentUid: undefined, 
  //     payment: p ? {
  //       status: p.status,
  //       price: p.price,
  //     } : {}
  //   }
  //  }

  // Возможно стоит заменить на patch
  @Delete('/reservations/:reservationId')
  @HttpCode(204)
  async deleteReservation(
    @Param('reservationId') uid: string,
    @Req() request: Request
  ) { 
    // const username: string = request.headers['x-user-name']?.toString();
    // if (!username) throw new  BadRequestException('username must be provided'); 

    // // status reservation canceled

    // const r = await this.reservation.setReservationStatus(username, uid, 'CANCELED').toPromise();

    // if (!r) {
    //   throw new ServiceUnavailableException('Reservation Service unavailable')
    // }

    // // payment cancelled

    // const p = await this.payment.changePaymentState(username, r.paymentUid, 'CANCELED').toPromise();

    // if (!p) {
    //   throw new ServiceUnavailableException('Payment Service unavailable')
    // }

    // //loylty - 1 

    // Logger.log('try to add job')
    // this.queue.add('job1',
    // {
    //   try: 1, 
    //   creationTime: Date.now(),
    //   request: 'updateLoyalty', 
    //   requestData: {
    //     username, 
    //     type: 'dec',
    //   }
    // });
    // const l = await this.loyalty.updateLoyaltyCount(username, 'dec').toPromise();
    // Logger.log(JSON.stringify(l))
  }
}
