import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScooterController } from './scooter/controllers/scooter/scooter.controller';
import { ScooterService } from './scooter/services/scooter/scooter.service';

@Module({
  imports: [],
  controllers: [AppController, ScooterController],
  providers: [AppService, ScooterService],
})
export class AppModule {}
