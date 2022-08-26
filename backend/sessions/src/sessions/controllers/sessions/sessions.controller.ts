import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Session } from 'src/models/session';
import { SessionsService } from 'src/sessions/services/sessions/sessions.service';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('sessions')
export class SessionsController {

    public constructor(
        private readonly sessions: SessionsService,
        private readonly users: UsersService
    ) {

    }


    @Post('/')
    public async createSession(
        @Body() session: Session,
    ) {
        // проверить, что есть такой пользователь.
        const user  = await this.users.getUserByUid(session.user_uid); 
        if (!user) {
            throw new BadRequestException('user with this uid does not exist');
        }

        if (user.user_role !== session.user_role) {
            throw new BadRequestException('cant create session for this role for this user');
        }

        return await this.sessions.createSession(session);
    }

    @Delete('/:token')
    public async stopSession(
        @Param('token') token: string, 
    ) {
        const session = await this.sessions.getSessionByToken(token); 
        if (!session) {
            return new NotFoundException();
        }
        return await this.sessions.deleteSessionByToken(token);
    }

    @Get('/:token') 
    public async getSession(
        @Param('token') token: string,
    ) {
        return await this.sessions.getSessionByToken(token);
    }

}
