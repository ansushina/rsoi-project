import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Session, SessionDto } from 'src/models/session';
import { User, UserRole } from 'src/models/user';
import { SessionsService } from 'src/sessions/services/sessions/sessions.service';
import { UsersService } from 'src/users/services/users/users.service';

import { v4 as uuidv4 } from 'uuid';

@Controller('sessions')
export class SessionsController {

    public constructor(
        private readonly sessions: SessionsService,
        private readonly users: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }


    @Post('/')
    public async createSession(
        @Body() session: SessionDto,
    ) {
        // проверить, что есть такой пользователь.
        const user  = await this.users.getUserByLogin(session.login); 
        if (!user) {
            throw new BadRequestException('user with this uid does not exist');
        }

        if (user.password !== session.password) {
            throw new BadRequestException('Wrong password');
        }

        return await this.sessions.createSession({
            user_role: user.user_role, 
            user_uid: user.uid,
            jwt: this.generateUserToken(user.uid, user.user_role),
            uid: uuidv4(),
        });
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


    private generateUserToken(user_uid: string, user_role: UserRole): string {
        const payload = { uid: user_uid, user_role };
        const token = this.jwtService.sign(payload);
        return token;
    }

}
