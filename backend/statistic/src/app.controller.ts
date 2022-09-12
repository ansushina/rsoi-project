import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { StatisticService } from './services/statistic/statistic.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly stats: StatisticService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('/user-reg')
  async regUserStatistic(
    @Body('user_uid') user_uid: string,
    @Body('date') date: string,
  ) {
    return this.stats.createUserStat({user_uid, date});
  }

  @Post('/rent-created')
  async rentCreated(
    
    @Body('user_uid') rent_uid: string,
    @Body('date') duration: string,
  ) {
    return this.stats.creatRentStat({rent_uid, duration});
  }

  @Get('/stats')
  async getStats() {

    const users = await this.stats.getAllUsersStats();
    const rents = await this.stats.getAllRnetStats();
    const sum = rents.reduce((a, b) => a.duration + b.duration, 0);
    const average = sum / rents.length;

    return {
      user_req: users.length, 
      rents: rents.length, 
      rent_average: average,
    }
  }
}
