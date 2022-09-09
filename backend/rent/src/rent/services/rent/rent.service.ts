import { Injectable, Logger } from '@nestjs/common';
import { PgService } from 'src/postgres/pg.service';


import { Client } from 'pg';
import { Rent } from 'src/models/rent';

@Injectable()
export class RentService {
    

    private tableName = 'rent';

    constructor() {
        var types = require('pg').types
        types.setTypeParser(1700, 'text', parseFloat);
        types.setTypeParser(20, Number);
        this.pg = new PgService().client;
    }

    private pg: Client;

    async getAllRents(): Promise<Rent[]> {
      const query = `
      SELECT * FROM ${this.tableName};
    `;

      const res = await this.pg.query(query);
      return res.rows;
  }



    async getUserRents(user_uid: string): Promise<Rent[]> {
        const query = `
        SELECT * FROM ${this.tableName}
        WHERE user_uid='${user_uid}';
      `;

        const res = await this.pg.query(query);
        return res.rows;
    }

    async getScooterRents(scooter_uid: string): Promise<Rent[]> {
      const query = `
      SELECT * FROM ${this.tableName}
      WHERE scooter_uid='${scooter_uid}';
    `;

      const res = await this.pg.query(query);
      return res.rows;
  }


    async getRentById(uid: string): Promise<Rent> {
        const query = `
        SELECT * FROM ${this.tableName}
        WHERE uid='${uid}'
        LIMIT 1;
      `;
      
    const res = await this.pg.query(query);
    if (res.rows.length === 0)
      throw new Error("Not Found!");
    else
      return res.rows[0];
    }

    async createRent(r: Rent) {
        Logger.log(JSON.stringify(r))
        const query = `
        INSERT INTO ${this.tableName} (uid, user_uid, payment_uid, scooter_uid, status, start_date, end_data)
          VALUES ('${r.uid}', '${r.user_uid}', '${r.payment_uid}', '${r.scooter_uid}', '${r.status}',timestamp '${r.start_date}',timestamp '${r.end_data}');
        `;      
      try {
        const result = await this.pg.query(query);
        return this.getRentById(r.uid);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to insert Rent to table!");
      }
    }

    async deleteRent(uid: string) {

        const query = `
        DELETE FROM ${this.tableName} 
        WHERE Rent_uid='${uid}';
        `;      
      try {
        await this.pg.query(query);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to insert Rent to table!");
      }
    }

    async updateRentStatus(uid: string, status: string) {
        
        const query = `
        UPDATE ${this.tableName} 
        SET status='${status}'
        WHERE Rent_uid='${uid}';
        `;      
      try {
        await this.pg.query(query);
        return this.getRentById(uid);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to update Rent to table!");
      }
    }
}
