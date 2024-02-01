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
import { Auth } from '../auth/decorator/auth.decorator';

/* LOCAL IMPORTS */
import { BookingService } from './booking.service';
import { BookingEntity } from './entities/booking.entity';
import { CreateBookingInputDto } from './dto';

/* ===================================================== */

@ApiTags('Booking')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAllBookings(): Promise<any[]> {
    return await this.bookingService.getAllBookings();
  }

  @Get(':bookingId')
  async getBookingById(
    @Param('bookingId', ParseIntPipe) bookingId: number,
  ): Promise<BookingEntity> {
    return await this.bookingService.getBookingById(bookingId);
  }

  @Post()
  async createBooking(
    @Auth() user: any,
    @Body() input: CreateBookingInputDto,
  ): Promise<BookingEntity> {
    return await this.bookingService.createBooking(user, input);
  }

  @Put(':bookingId')
  async editBookingById(
    @Body() input: any,
    @Param('bookingId', ParseIntPipe) bookingId: number,
  ): Promise<BookingEntity> {
    return await this.bookingService.editBookingById(bookingId, input);
  }

  @Delete(':bookingId')
  async deleteBookingById(
    @Param('bookingId', ParseIntPipe) bookingId: number,
  ): Promise<any> {
    return await this.bookingService.deleteBookingById(bookingId);
  }
}
