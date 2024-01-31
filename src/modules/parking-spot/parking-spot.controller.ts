/* THIRD PARTY IMPORTS */
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */
import { ParkingSpotService } from './parking-spot.service';

/* ===================================================== */

@ApiTags('ParkingSpot')
@Controller('parking-spots')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}
}
