/* THIRD PARTY IMPORTS */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */
import { ParkingSpotEntity } from './entities/parking-spot.entity';
import { ParkingSpotController } from './parking-spot.controller';
import { ParkingSpotService } from './parking-spot.service';
import { ParkingSpotPermissionMiddleware } from './middleware/parking-spot-permission.middleware';

/* ===================================================== */

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpotEntity])],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
  exports: [ParkingSpotService],
})
export class ParkingSpotModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ParkingSpotPermissionMiddleware)
      .forRoutes({ path: 'parking-spots/(*)', method: RequestMethod.ALL })
      .apply(ParkingSpotPermissionMiddleware)
      .forRoutes({ path: 'parking-spots', method: RequestMethod.ALL });
  }
}
