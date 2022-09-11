import { BadRequestException, Body, Controller, Delete, Get, HttpException, Logger, Param, Patch, Post, Req } from '@nestjs/common';
import { Rent } from 'src/models/rent';
import { RentService } from 'src/rent/services/rent/rent.service';
import { Request } from 'express';

@Controller('rent')
export class RentController {

    constructor(
        private readonly rents: RentService,
        // private readonly Scooter: ScootersService,
    ) { }


    // public RentToDTO(r: Rent, h: Scooter) {
    //     return {
    //         status: r.status,
    //         Scooter: {
    //             ScooterUid: h.Scooter_uid,
    //             name: h.name,
    //             fullAddress: h.country + ', ' + h.city + ', '+h.address,
    //             stars: h.stars
    //         },
    //         RentUid: r.Rent_uid,
    //         startDate: r.start_date,
    //         endDate: r.end_data,
    //         paymentUid: r.payment_uid,
    //     }
    // }

    @Get('/')
    async getAllUsersRents(
        @Req() request: Request
    ) {
        Logger.log(JSON.stringify(request.headers))
        const username: string = request.headers['x-user-name']?.toString();
        if (!username) {
            return await this.rents.getAllRents();
        }
        const Rents =  await this.rents.getUserRents(username);
        const items = [];
        for (const r of Rents) {
            items.push(r);
        }
        return items;
    }

    @Get('/scooter')
    async getScooterRents(
        @Req() request: Request
    ) {
        Logger.log(JSON.stringify(request.headers))
        const scooter: string = request.headers['x-scoorer-name']?.toString();
        if (!scooter) {
            return await this.rents.getAllRents();
        }
        const Rents =  await this.rents.getScooterRents(scooter);
        const items = [];
        for (const r of Rents) {
            items.push(r);
        }
        return items;
    }


    @Get('/:RentUid') 
    async getOneRent(
        @Param('RentUid') uid: string,  
        @Req() request: Request
    ) {
        return await this.rents.getRentById(uid)
    }

    @Post('/')
    async createRent(
        @Body() body: Rent,
        @Req() request: Request
    ) {
        const username: string = request.headers['x-user-name']?.toString();
        if (!username) throw new  BadRequestException('username must be provided');
        if (body.user_uid != username) throw new HttpException('cant create Rent for another user', 403); 
        // const h = await this.Scooter.getScooterByUid(body.Scooter_id.toString());
        // if (!h) throw new BadRequestException('no Scooter with this id')
        const r = await this.rents.createRent({
            ...body,
        });
        const dto = r;
        return {
            ...dto, 
            Scooter: undefined, 
        }
    }

    @Patch('/:RentUid') 
    async updateRent(
        @Param('RentUid') uid: string,  
        @Req() request: Request,
        @Body('status') status: string, 
    ) {
        const username: string = request.headers['x-user-name']?.toString();
        if (!username) throw new  BadRequestException('username must be provided');
        const r = await this.rents.getRentById(uid);
        if (r.user_uid === username) {
            const result = await this.rents.updateRentStatus(uid, status);
            // const h = await this.Scooter.getScooterById(r.Scooter_id);
            return result;
        } else {
            throw new HttpException('Username not equal', 403);
        }
    }

    @Delete('/:RentUid') 
    async deleteRent(
        @Param('RentUid') uid: string,  
        @Req() request: Request
    ) {
        const username =  request.headers['X-User-Name'].toString();
        const r = await this.rents.getRentById(uid);
        if (r.user_uid === username) {
            await this.rents.deleteRent(uid)
        } else {
            throw new HttpException('Username not equal', 403);
        }
    }
    
}
