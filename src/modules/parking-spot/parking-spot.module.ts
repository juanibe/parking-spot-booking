/* THIRD PARTY IMPORTS */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */
import { ParkingSpotEntity } from './entities/parking-spot.entity';
import { ParkingSpotController } from './parking-spot.controller';
import { ParkingSpotService } from './parking-spot.service';

/* ===================================================== */

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpotEntity])],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
  exports: [ParkingSpotService],
})
export class ParkingSpotModule {}
