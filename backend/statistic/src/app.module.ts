import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticService } from './services/statistic/statistic.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StatisticService],
})
export class AppModule {}
