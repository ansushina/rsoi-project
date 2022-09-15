import { Injectable, Logger } from '@nestjs/common';
import { PgService } from 'src/postgres/postgres.service';


import { Client } from 'pg';
import { retry } from 'rxjs';

@Injectable()
export class StatisticService {

    private tableName = 'user_stats';

    
    private tableNameRent = 'rent_stats';

    private pg: Client;

    constructor() {
        var types = require('pg').types
        types.setTypeParser(1700, 'text', parseFloat);
        types.setTypeParser(20, Number);
        this.pg = new PgService().client;
    }


    public async getAllUsersStats() {
        const query = `
        SELECT * FROM ${this.tableName};
      `;
  
        const res = await this.pg.query(query);
        return res.rows;
    }


    
    public async getAllRnetStats() {
        const query = `
        SELECT * FROM ${this.tableNameRent};
      `;
  
        const res = await this.pg.query(query);
        return res.rows;
    }


    public async createUserStat(user: {user_uid: string, date: string}) {
        Logger.log(JSON.stringify(user));
        const query = `
        INSERT INTO ${this.tableName} (user_uid, date)
          VALUES ('${user.user_uid}', timestamp '${user.date}');
        `;      
      try {
        const result = await this.pg.query(query);
        return result;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to insert ruser to table!");
      }
    }

    public async creatRentStat(user: {rent_uid: string, duration: string}) {
        Logger.log(JSON.stringify(user));
        const query = `
        INSERT INTO ${this.tableNameRent} (rent_uid, duration)
          VALUES ('${user.rent_uid}', ${user.duration} );
        `;      
      try {
        const result = await this.pg.query(query);
        return result;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to insert ruser to table!");
      }
    }
}
