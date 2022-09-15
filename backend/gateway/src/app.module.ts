import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScootersService } from './services/scooters/scooters.service';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RentService } from './services/rent/rent.service';
import { PaymentService } from './services/payment/payment.service';
import { StatisticService } from './services/statistic/statistic.service';
import { BullModule } from '@nestjs/bull';
import { MessageConsumer } from './utils/order/order.consumer';

@Module({
  imports: [
    HttpModule, 
    JwtModule,
    BullModule.forRoot({
      redis: {
        host: 'ec2-54-246-40-13.eu-west-1.compute.amazonaws.com',
        port: 22430,
        password: 'pb75d8f8fda76b3cd89e321b57db8dda2bea6ae899d705f5db90e4f728aa4d55e',
        tls: {
          rejectUnauthorized: false
      }
      },
    }),
    BullModule.registerQueue({
      name:'queue1',
      // redis: {
      //   // host: 'ec2-34-247-243-70.eu-west-1.compute.amazonaws.com',
      //   // port: 13510,
      //   // password: 'pb75d8f8fda76b3cd89e321b57db8dda2bea6ae899d705f5db90e4f728aa4d55e',
      //   path: 'redis://:pb75d8f8fda76b3cd89e321b57db8dda2bea6ae899d705f5db90e4f728aa4d55e@ec2-34-247-243-70.eu-west-1.compute.amazonaws.com:13510'
      // }
    })
  ],
  controllers: [AppController],
  providers: [AppService, ScootersService, AuthService, RentService, PaymentService, StatisticService, MessageConsumer],
})
export class AppModule { }
