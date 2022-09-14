import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { StatisticService } from './services/statistic/statistic.service';
import * as  _ from 'lodash';
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
    
    @Body('rent_uid') rent_uid: string,
    @Body('duration') duration: string,
  ) {
    return this.stats.creatRentStat({rent_uid, duration});
  }

  @Get('/stats')
  async getStats() {

    const users = await this.stats.getAllUsersStats();
    const rents = await this.stats.getAllRnetStats();
    const sum = _.sumBy(rents, 'duration');
    const average = sum / rents.length;

    Logger.log(JSON.stringify(rents))
    return {
      user_reg: users.length, 
      rents: rents.length, 
      rent_average: average,
    }
  }
}
