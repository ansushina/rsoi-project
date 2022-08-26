import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Session } from 'src/models/session';
import { SessionsService } from 'src/sessions/services/sessions/sessions.service';

@Controller('sessions')
export class SessionsController {

    public constructor(
        private readonly sessions: SessionsService,
    ) {

    }


    @Post('/')
    public async createSession(
        @Body() session: Session,
    ) {
        // проверить, что есть такой пользователь.
        return await this.sessions.createSession(session);
    }

    @Delete('/:token')
    public async stopSession(
        @Param('token') token: string, 
    ) {
        return await this.sessions.deleteSessionByToken(token);
    }

    @Get('/:token') 
    public async getSession(
        @Param('token') token: string,
    ) {
        return await this.sessions.getSessionByToken(token);
    }

}
