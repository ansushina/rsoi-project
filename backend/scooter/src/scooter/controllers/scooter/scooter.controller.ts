import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Scooter } from 'src/models/scooter';
import { ScooterService } from 'src/scooter/services/scooter/scooter.service';

@Controller('scooters')
export class ScooterController {
    constructor(
        private readonly scooters: ScooterService
    ) {

    }

    @Get('/')
    async getAll(
        @Query('size') pageSize: number,
        @Query('page') page: number
    ) {
        const items =  (await this.scooters.getAllScooters(page, pageSize)).filter(s => s.availability).map(h => this.scooters.scooterToScooterDTO(h));
        const count  = await this.scooters.getScootersCount();
        return {
            page: page? parseInt(page.toString()) : 1,
            pageSize: pageSize ? parseInt(pageSize?.toString()) : count,
            totalElements: count,
            items
        }; 
    }

    @Get('/:scooterUid') 
    async getOneScooter(
        @Param('scooterUid') uid: string,  
    ) {
        return this.scooters.scooterToScooterDTO( await this.scooters.getScooterByUid(uid));
    }

    @Patch('/:scooterUid')
    async updateScooter(
        @Param('scooterUid') uid: string,
        @Body() scooter: Scooter,
    ) {
        return this.scooters.updateScooterStatus(uid, scooter.availability);
    }


    @Post('/')
    async createScooter(
        @Body() scooter: Scooter,
    ) {
        return this.scooters.createScooter(scooter);
    }
}
