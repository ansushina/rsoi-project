import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentController } from './rent/controllers/rent/rent.controller';
import { RentService } from './rent/services/rent/rent.service';

@Module({
  imports: [],
  controllers: [AppController, RentController],
  providers: [AppService, RentService],
})
export class AppModule {}
