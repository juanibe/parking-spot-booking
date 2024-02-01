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
import {
  ApiForbiddenResponse,
  ApiHeaders,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async getParkingSpotById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.parkingSpotService.getParkingSpotById(id);
  }

  @Get()
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async getAllParkingSpots(@Auth() user: any): Promise<any[]> {
    return await this.parkingSpotService.getAllParkingSpots();
  }

  @Post()
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async createParkingSpot(
    @Auth() user: any,
    @Body() input: any,
  ): Promise<any[]> {
    return await this.parkingSpotService.createParkingSpot(input);
  }

  @Put(':id')
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async editParkingSpotById(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: any,
  ): Promise<any> {
    return await this.parkingSpotService.editParkingSpotById(id, input);
  }

  @Delete(':id')
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async deleteParkingSpotById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.parkingSpotService.deleteParkingSpotById(id);
  }
}
