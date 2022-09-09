import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScootersService } from './services/scooters/scooters.service';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RentService } from './services/rent/rent.service';
import { PaymentService } from './services/payment/payment.service';

@Module({
  imports: [HttpModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, ScootersService, AuthService, RentService, PaymentService],
})
export class AppModule { }
