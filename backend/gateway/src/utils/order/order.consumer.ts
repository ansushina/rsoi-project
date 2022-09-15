import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job, Queue } from "bull";
import { AppService } from "src/app.service";
import { AuthService } from "src/services/auth/auth.service";
import { PaymentService } from "src/services/payment/payment.service";
import { RentService } from "src/services/rent/rent.service";
import { ScootersService } from "src/services/scooters/scooters.service";
import { StatisticService } from "src/services/statistic/statistic.service";

interface SuperJob {
  try: number,
  creationTime: number,
  request: string,
  data: any,
}

@Processor('queue1')
export class MessageConsumer {

  constructor(
    
    private readonly appService: AppService,
    private readonly scooters: ScootersService,
    private readonly auth: AuthService,
    private readonly rent: RentService,
    private readonly payment: PaymentService,
    private readonly stats: StatisticService,
    @InjectQueue('queue1') private queue: Queue
  ) { }

  @Process('job1')
  async readOperationJob(job: Job<SuperJob>) {
    // Logger.log(job.data)
    // let res = null;
    // while (job.data.creationTime + 10*60*60*1000 < Date.now() && !res) {
    //     res = await this.loyalty.updateLoyaltyCount(job.data.requestData.username, job.data.requestData.type);
    //     Logger.log('res', JSON.stringify(res))
    // }
    if (job.data.creationTime + 10000 > Date.now()) {
      this.queue.add('job1', job.data);
       return;
    }
    try {
      const res = await this.request(job.data.request, job.data.data);
      Logger.log(JSON.stringify(job.data), 'jobdata')
      Logger.log(JSON.stringify(res), 'res')
      if (!res) {
        this.queue.add('job1',
          {
            try: job.data.try + 1,
            creationTime: Date.now(),
            request: job.data.request,
            data: job.data.data
          })
      }
    } catch  (e){
      Logger.log(JSON.stringify(e.message), 'error')
      this.queue.add('job1',
        {
          try: job.data.try + 1,
          creationTime: Date.now(),
          request: job.data.request,
          data: job.data.data
        })
    }
  }


  private request(name: string, data: any): Promise<any> {
    switch(name) {
      case 'rent-stats': 
      return this.stats.sendRetnStats(data);
    }
  }
}