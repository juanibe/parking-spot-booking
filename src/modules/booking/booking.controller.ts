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
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiOkResponse({ type: BookingEntity })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async getAllBookings(): Promise<any[]> {
    return await this.bookingService.getAllBookings();
  }

  @Get(':bookingId')
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async getBookingById(
    @Param('bookingId', ParseIntPipe) bookingId: number,
  ): Promise<BookingEntity> {
    return await this.bookingService.getBookingById(bookingId);
  }

  @Post()
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async createBooking(
    @Auth() user: any,
    @Body() input: CreateBookingInputDto,
  ): Promise<BookingEntity> {
    return await this.bookingService.createBooking(user, input);
  }

  @Put(':bookingId')
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async editBookingById(
    @Body() input: any,
    @Param('bookingId', ParseIntPipe) bookingId: number,
  ): Promise<BookingEntity> {
    return await this.bookingService.editBookingById(bookingId, input);
  }

  @Delete(':bookingId')
  @ApiHeaders([{ name: 'api_token', description: 'Api token to authenticate' }])
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized:ApiTokenNotProvidedOrInvalid',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async deleteBookingById(
    @Param('bookingId', ParseIntPipe) bookingId: number,
  ): Promise<any> {
    return await this.bookingService.deleteBookingById(bookingId);
  }
}
