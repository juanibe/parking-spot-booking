/* THIRD PARTY IMPORTS */
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */
import { BookingService } from './booking.service';

/* ===================================================== */

@ApiTags('Booking')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
}
