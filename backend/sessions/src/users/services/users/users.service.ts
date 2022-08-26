import { Injectable, Logger, NotFoundException } from '@nestjs/common';


import { Client } from 'pg';
import { User } from 'src/models/user';
import { PgService } from 'src/postgres/postgres.service';



const USERS_TABLE: string = 'users';

@Injectable()
export class UsersService {

    private tableName = USERS_TABLE;

    private pg: Client;

    constructor() {
        var types = require('pg').types
        types.setTypeParser(1700, 'text', parseFloat);
        types.setTypeParser(20, Number);
        this.pg = new PgService().client;
    }


    public async getUserByUid(uid: string) {
        const query = `
        SELECT * FROM ${this.tableName}
        WHERE uid='${uid}'
        LIMIT 1;
      `;

        const res = await this.pg.query(query);
        if (res.rows.length === 0)
            return undefined;
        else
            return {
                ...res.rows[0],
                id: undefined,
            };
    }

    public async getUserByLogin(login: string) {
      const query = `
      SELECT * FROM ${this.tableName}
      WHERE login='${login}'
      LIMIT 1;
    `;

      const res = await this.pg.query(query);
      if (res.rows.length === 0)
          return undefined;
      else
          return {
              ...res.rows[0],
              id: undefined,
          };

  }


    public async deleteUserByUid(uid: string) {
        const query = `
        DELETE FROM ${this.tableName} 
        WHERE uid='${uid}';
        `;      
      try {
        await this.pg.query(query);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to delete user!");
      }
     }

    public async  updateUser(user: User) {

    }


    public async createUser(user: User) {
        Logger.log(JSON.stringify(user));
        const query = `
        INSERT INTO ${this.tableName} (uid, user_role,  login, password)
          VALUES ('${user.uid}', '${user.user_role}', '${user.login}', ${user.password});
        `;      
      try {
        const result = await this.pg.query(query);
        return this.getUserByUid(user.uid);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to insert ruser to table!");
      }
    }
}
