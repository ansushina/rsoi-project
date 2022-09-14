import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpCode, InternalServerErrorException, Logger, Param, Post, Query, Req, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Payment } from './models/payment';
import { v4 as uuidv4 } from 'uuid';
import { ScootersService } from './services/scooters/scooters.service';
import { Request } from 'express';
import { User } from './models/user';
import { AuthService } from './services/auth/auth.service';
import { SessionDto } from './models/session';
import { Roles, RolesGuard } from './utils/guards/roles.guard';
import { RentService } from './services/rent/rent.service';
import { PaymentService } from './services/payment/payment.service';
import * as moment from 'moment';
import { Scooter } from './models/scooter';
import { StatisticService } from './services/statistic/statistic.service';
import { DateTime } from 'luxon';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly scooters: ScootersService,
    private readonly auth: AuthService,
    private readonly rent: RentService,
    private readonly payment: PaymentService,
    private readonly stats: StatisticService,
    // @InjectQueue('queue1') private queue: Queue
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // регистрация 
  @Post('/users')
  async registerUser(
    @Body() user: User,
  ) {
    const result = this.auth.createUser(user);

    await this.stats.sendUserStatistic(user.uid, (new Date()).toISOString());

    return result;
  }

  // вход
  @Post('/sessions')
  async createSession(
    @Body() session: SessionDto,
  ) {
    return this.auth.createSession(session);
  }

  // выход
  @Delete('/sessions/:sessionId')
  async seleteSession(
    @Param('sessionId') sessionId: string,
  ) {
    return this.auth.deleteSession(sessionId);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('/scooters')
  async createScooter(
    @Body() s: Scooter,
  ) {
    return this.scooters.createScooter(s);
  }

  // а зачем мне все?
  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Get('/scooters')
  async getScooters(
    @Query('page') page: number,
    @Query('size') size: number
  ) {
    // const rent =  await this.rent.getRent();
    const scooters = await this.scooters.getScooters(page, size);

    return scooters;
  }


  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Get('/rent')
  async getUserRents(

    @Req() request: Request,
  ) {
    const session = await this.auth.getSessionByToken(request.headers['token']?.toString())

    const userRents = await this.rent.getUserRent(session.user_uid);

    const result = [];

    for (const rent of userRents) {
      let payment;
      if (rent.payment_uid) {
        payment = await this.payment.getPayment(session.user_uid, rent.payment_uid);
      }
      const scooter = await this.scooters.getScooterById(rent.scooter_uid);
      result.push({
        ...rent,
        payment,
        scooter,
      })
    }

    return result;
  }


  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Post('/rent/')
  @HttpCode(200)
  async createRent(
    @Req() request: Request,
    @Body('startDate') startDate: string,
    // @Body('endDate') endDate: string,
    @Body('scooterUid') scooterUid: string,
  ) {

    const session = await this.auth.getSessionByToken(request.headers['token']?.toString())

    Logger.log(JSON.stringify(session))

    const scooter = await this.scooters.getScooterById(scooterUid);


    Logger.log(JSON.stringify(scooter))

    if (!scooter) {
      throw new Error('Самокат не найден');
    }

    if (scooter.availability != true) {
      throw new BadRequestException('Самокат уже используется');
    }


    const userRents = await this.rent.getUserRent(session.user_uid);


    Logger.log(JSON.stringify(userRents))


    // const isScooredRented = scooterRents.find(rent => new Date(rent.end_data) > new Date());
    const isUserHasRent = userRents.find(rent => new Date(rent.end_data) > new Date());

    // if (isScooredRented) {
    //   throw new BadRequestException('Самокат уже арендован');
    // } 

    if (isUserHasRent) {
      throw new BadRequestException('У пользователя уже есть арендованный самокат');
    }



    const resultSU = await this.scooters.updateScooterStatus(scooterUid, false)

    if (!resultSU) {
      throw new InternalServerErrorException('Не удалось изменить статус самоката');
    }
    // создать ренту



    //  проверка удачности


    // создать оплату 

    // const paymentDto = { payment_uid: uuidv4(), status: 'PAID', price: scooter.price } as Payment

    // const payment = await this.payment.createPayment(session.user_uid, paymentDto);

    // if (!payment) {
    //   await this.scooters.updateScooterStatus(scooterUid, true);
    //   throw new InternalServerErrorException('Не удалось оплатить');
    // }



    const newRent = {
      user_uid: session.user_uid,
      scooter_uid: scooter.uid,
      // payment_uid: payment.payment_uid,
      uid: uuidv4(),
      status: 'started',
      start_date: startDate,
      // end_data: endDate,
    };

    const r = await this.rent.createRent(newRent, session.user_uid);

    if (!r) {
      // await this.payment.changePaymentState(session.user_uid, payment.payment_uid, 'CANCELED');
      await this.scooters.updateScooterStatus(scooterUid, true);
      throw new InternalServerErrorException('Не удалось оплатить');
    }

    return {
      ...r,
      // payment: {
      //   status: payment.status,
      //   price: payment.price,
      // }
    }
  }

  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Get('/rent/:rentId')
  async getRentById(
    @Param('rentId') uid: string,
    @Req() request: Request
  ) {
    const session = await this.auth.getSessionByToken(request.headers['token']?.toString())


    Logger.log(JSON.stringify(session))


    const r = await this.rent.getRentById(uid);


    Logger.log(JSON.stringify(r))

    if (!r || r.user_uid !== session.user_uid) {
      throw new ForbiddenException('Этот заказ не принадлежит пользователю');
    }
    let p;
    console.log('asdasdsa')
    if (r.payment_uid) {
      console.log(JSON.stringify(r))
      p = await this.payment.getPayment(session.user_uid, r.payment_uid);
    }


    const scooter = await this.scooters.getScooterById(r.scooter_uid);

    return {
      ...r,
      paymentUid: undefined,
      payment: p ? {
        status: p.status,
        price: p.price,
      } : {},
      scooter
    }
  }

  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Delete('/rent/:rentId')
  @HttpCode(204)
  async deleteRent(
    @Param('rentId') uid: string,
    @Req() request: Request
  ) {

    const session = await this.auth.getSessionByToken(request.headers['token']?.toString())


    Logger.log(JSON.stringify(session))

    const r = await this.rent.getRentById(uid);


    Logger.log(JSON.stringify(r))
    if (r.user_uid !== session.user_uid) {
      throw new ForbiddenException('Этот заказ не принадлежит пользователю');
    }


    const resultSU = await this.scooters.updateScooterStatus(r.scooter_uid, true)

    if (!resultSU) {
      throw new InternalServerErrorException('Не удалось изменить статус самоката');
    }
    // создать ренту

    // // status rent canceled

    const rent = await this.rent.setRentStatus(session.user_uid, uid, 'CANCELED').toPromise();


    if (!rent) {
      throw new ServiceUnavailableException('Rent Service unavailable')
    }


    const p = await this.payment.changePaymentState(session.user_uid, rent.payment_uid, 'CANCELED');

    if (!p) {
      throw new ServiceUnavailableException('Payment Service unavailable')
    }

  }



  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Post('rent/:rentId/finish')
  async finishRent(
    @Param('rentId') uid: string,
    @Req() request: Request
  ) {

    const session = await this.auth.getSessionByToken(request.headers['token']?.toString())


    Logger.log(JSON.stringify(session))

    const r = await this.rent.getRentById(uid);


    Logger.log(JSON.stringify(r))
    if (r.user_uid !== session.user_uid) {
      throw new ForbiddenException('Этот заказ не принадлежит пользователю');
    }

    const scooter = await this.scooters.getScooterById(r.scooter_uid);


    Logger.log(JSON.stringify(scooter))

    if (!scooter) {
      throw new Error('Самокат не найден');
    }

    // if (scooter.availability == true) {
    //   throw new BadRequestException('Самокат уже не используется');
    // }

    //  создать оплату

    const paymentDto = { payment_uid: uuidv4(), status: 'PAID', price: scooter.price } as Payment

    const payment = await this.payment.createPayment(session.user_uid, paymentDto);

    if (!payment) {
      // await this.scooters.updateScooterStatus(r.scooter_uid, true);
      throw new InternalServerErrorException('Не удалось оплатить');
    }


    const rent = await this.rent.setRentStatus(session.user_uid, uid, 'ended', (new Date()).toISOString(), payment.payment_uid).toPromise();


    const resultSU = await this.scooters.updateScooterStatus(r.scooter_uid, true)

    if (!resultSU) {
      throw new InternalServerErrorException('Не удалось изменить статус самоката');
    }
    Logger.log(rent.end_data);
    Logger.log(rent.start_date);
    const from = DateTime.fromISO(rent.start_date);
    const to = DateTime.fromISO(rent.end_data);
    const duration = to.diff(from, 'minutes').minutes;

    Logger.log(`${rent.uid} ${duration.toString()}`)
    await this.stats.sendRetnStats(rent.uid, duration.toString());

  }


  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('stats') 
  async getStats() {
    return this.stats.getStats();
  }
}
