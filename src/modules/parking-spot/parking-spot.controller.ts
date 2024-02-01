/* THIRD PARTY IMPORTS */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */
import { ParkingSpotService } from './parking-spot.service';
import { Auth } from '../auth/decorator/auth.decorator';

/* ===================================================== */

@ApiTags('ParkingSpot')
@Controller('parking-spots')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  @Get(':id')
  async getParkingSpotById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.parkingSpotService.getParkingSpotById(id);
  }

  @Get()
  async getAllParkingSpots(@Auth() user: any): Promise<any[]> {
    return await this.parkingSpotService.getAllParkingSpots();
  }

  @Post()
  async createParkingSpot(
    @Auth() user: any,
    @Body() input: any,
  ): Promise<any[]> {
    return await this.parkingSpotService.createParkingSpot(input);
  }

  @Put(':id')
  async editParkingSpotById(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: any,
  ): Promise<any> {
    return await this.parkingSpotService.editParkingSpotById(id, input);
  }

  @Delete(':id')
  async deleteParkingSpotById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.parkingSpotService.deleteParkingSpotById(id);
  }
}
