import { Controller, Get, Param, Query } from '@nestjs/common';
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
        const items =  (await this.scooters.getAllScooters(page, pageSize)).map(h => this.scooters.scooterToScooterDTO(h));
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
}
