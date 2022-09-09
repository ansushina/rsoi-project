import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/models/user';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    public constructor(
        private readonly users: UsersService,
    ) { }

    @Post('/')
    public async createUser(
        @Body() user: User,
    ) {
        //проверить наличие такого юзера
        const oldUser = await this.users.getUserByUid(user.uid);
        if (oldUser) {
            throw new ConflictException('User with same uid already exists');
        }

        const sameLoginUser = await this.users.getUserByLogin(user.login);

        if (sameLoginUser) {
            throw new ConflictException('User with same login already exists');
        }

        if(user.user_role !== 'user') {
            throw new BadRequestException('Cant create user with this role');
        }

        return await this.users.createUser(user);
    }

    
    @Get('/:userId')
    public async getUser(
        @Param('userId') userId: string,
    ) {
        const user =  await this.users.getUserByUid(userId);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    @Delete('/:userId')
    public async deleteUser(
        @Param('userId') userId: string,
    ) {
        return await this.users.deleteUserByUid(userId);
    }

    @Patch('/:userId')
    public async updateUser() {

    }

}
