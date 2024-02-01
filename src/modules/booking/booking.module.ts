/* THIRD PARTY IMPORTS */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* GLOBAL IMPORTS */
import { ParkingSpotModule } from '../parking-spot/parking-spot.module';

/* LOCAL IMPORTS */
import { BookingEntity } from './entities/booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingPermissionMiddleware } from './middleware/booking-permission.middleware';
import { UserModule } from '../user/user.module';

/* ===================================================== */

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    ParkingSpotModule,
    UserModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BookingPermissionMiddleware)
      .forRoutes({ path: 'bookings/(*)', method: RequestMethod.ALL })
      .apply(BookingPermissionMiddleware)
      .forRoutes({ path: 'bookings', method: RequestMethod.GET });
  }
}
