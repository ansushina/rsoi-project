import { Injectable } from '@nestjs/common';
import { PgService } from 'src/postgres/pg.service';


import { Client } from 'pg';
import { Scooter } from 'src/models/scooter';

@Injectable()
export class ScooterService {


    private tableName = 'scooters';

    constructor() {
        var types = require('pg').types
        types.setTypeParser(1700, 'text', parseFloat);
        types.setTypeParser(20, Number);
        this.pg = new PgService().client;
    }

    private pg: Client;

    public scooterToScooterDTO(h: Scooter) {
        return {
            ...h,
            uid: h.uid,
        }
    }

    async getScootersCount() {
        const query = `SELECT COUNT(*) FROM ${this.tableName};`
        const res = await this.pg.query(query);
        return res.rows[0].count;
    }

    async getAllScooters(page: number = 1, size: number | 'all' = 'all'): Promise<Scooter[]> {

        // Logger.log(JSON.stringify(await this.pg.query(`INSERT INTO Scooters (Scooter_uid, name, country, city, address, stars, price) VALUES ('049161bb-badd-4fa8-9d90-87c9a82b0668', 'Ararat Park Hyatt Moscow', 'Россия', 'Москва', 'Неглинная ул., 4', 5, 10000);`)));
        const query = `
        SELECT * FROM ${this.tableName}
        LIMIT ${size} OFFSET ${size == 'all' ? 0 : size * (page - 1)};
      `;

        const res = await this.pg.query(query);
        return res.rows;

    }

    async getScooterByUid(uid: string): Promise<Scooter> {
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

    async getScooterById(id: number) {
        const query = `
        SELECT * FROM ${this.tableName}
        WHERE id=${id}
        LIMIT 1;
      `;

        const res = await this.pg.query(query);
        if (res.rows.length === 0)
            throw new Error("Not Found!");
        else
            return res.rows[0];
    }
}
