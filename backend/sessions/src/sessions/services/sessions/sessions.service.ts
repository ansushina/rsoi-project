import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PgService } from 'src/postgres/postgres.service';

import { Client } from 'pg';
import { Session } from 'src/models/session';


const SESSIONS_TABLE: string = 'sessions';

@Injectable()
export class SessionsService {


  private tableName = SESSIONS_TABLE;


  private pg: Client;

  constructor() {
    var types = require('pg').types
    types.setTypeParser(1700, 'text', parseFloat);
    types.setTypeParser(20, Number);
    this.pg = new PgService().client;
  }


  public async getSessionByUserId(userUid: string) {
    const query = `
        SELECT * FROM ${this.tableName}
        WHERE user_uid='${userUid}'
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


  public async getSessionByToken(token: string) {
    const query = `
        SELECT * FROM ${this.tableName}
        WHERE jwt='${token}'
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

  public async deleteSessionByToken(token: string) {
    const query = `
        DELETE FROM ${this.tableName} 
        WHERE jwt='${token}';
        `;
    try {
      await this.pg.query(query);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete session!");
    }
  }


  public async createSession(session: Session) {
    Logger.log(JSON.stringify(session));
    const query = `
      INSERT INTO ${this.tableName} (uid, user_uid,  user_role, jwt)
        VALUES ('${session.uid}', '${session.user_uid}', '${session.user_role}', '${session.jwt}');
      `;
    try {
      const result = await this.pg.query(query);
      return this.getSessionByUserId(session.user_uid)
    } catch (error) {
      console.log(error);
      throw new Error("Failed to insert ruser to table!");
    }
  }
}
