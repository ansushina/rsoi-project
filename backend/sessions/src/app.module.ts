import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsController } from './sessions/controllers/sessions/sessions.controller';
import { SessionsService } from './sessions/services/sessions/sessions.service';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersService } from './users/services/users/users.service';

@Module({
  imports: [],
  controllers: [AppController, SessionsController, UsersController],
  providers: [AppService, SessionsService, UsersService],
})
export class AppModule {}
