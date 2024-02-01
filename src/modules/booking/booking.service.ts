/* THIRD PARTY IMPORTS */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { Repository } from 'typeorm';

/* GLOBAL IMPORTS */
import { UserEntity } from '../user/entities/user.entity';
import { ParkingSpotService } from '../parking-spot/parking-spot.service';

/* LOCAL IMPORTS */
import { CreateBookingInputDto } from './dto';

/* ===================================================== */

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly parkingSpotService: ParkingSpotService,
  ) {}

  async checkBookingTimeSlotAvailabilityByStartAndParkingSpotId(
    start: Date,
    parkingSpotId: number,
  ): Promise<BookingEntity> {
    const overlappingBooking = await this.bookingRepository
      .createQueryBuilder('booking')
      .where(':newBookingStart BETWEEN booking.start AND booking.end', {
        newBookingStart: start,
      })
      .andWhere('booking.parkingSpot = :parking', {
        parking: parkingSpotId,
      })
      .getOne();

    return overlappingBooking;
  }

  async getAllBookings(): Promise<any> {
    return await this.bookingRepository.find();
  }

  async getBookingById(bookingId: number): Promise<BookingEntity> {
    const bookingFound = await this.bookingRepository.findOne({
      relations: ['bookedByUser', 'parkingSpot'],
      where: { id: bookingId },
    });
    if (!bookingFound)
      throw new HttpException('BookingNotFound', HttpStatus.NOT_FOUND);
    return bookingFound;
  }

  async createBooking(
    user: UserEntity,
    input: CreateBookingInputDto,
  ): Promise<BookingEntity> {
    const parkingSpotExists = await this.parkingSpotService.getParkingSpotById(
      input.parkingSpot as number,
    );

    if (!parkingSpotExists)
      throw new HttpException('ParkinSpotDoesNotExist', HttpStatus.NOT_FOUND);

    const overlappingBooking =
      await this.checkBookingTimeSlotAvailabilityByStartAndParkingSpotId(
        input.start,
        input.parkingSpot,
      );

    if (overlappingBooking)
      throw new HttpException('TimeSlotNotAvailable', HttpStatus.BAD_REQUEST);

    const saveResult = await this.bookingRepository.save({
      start: input.start,
      end: input.end,
      parkingSpot: parkingSpotExists,
      bookedByUser: user,
    });

    return await this.getBookingById(saveResult.id);
  }

  async deleteBookingById(id: number): Promise<{ success: boolean }> {
    try {
      await this.bookingRepository.delete(id);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  async editBookingById(id: number, input: any): Promise<any> {
    const payload = {};
    const bookingBeingUpdated = await this.getBookingById(id);

    if (input.start) {
      const overlappingBooking =
        await this.checkBookingTimeSlotAvailabilityByStartAndParkingSpotId(
          input.start,
          input.parkingSpot || bookingBeingUpdated.parkingSpot.id,
        );

      if (overlappingBooking)
        throw new HttpException('TimeSlotNotAvailable', HttpStatus.BAD_REQUEST);

      payload['start'] = input.start;
    }

    if (input.end) {
      payload['end'] = input.end;
    }

    if (input.parkingSpot) {
      const parkingSpotExists =
        await this.parkingSpotService.getParkingSpotById(
          input.parkingSpot as number,
        );

      if (!parkingSpotExists)
        throw new HttpException('ParkinSpotDoesNotExist', HttpStatus.NOT_FOUND);

      payload['parkingSpot'] = input.parkingSpot;
    }

    await this.bookingRepository.update(id, payload);
    return await this.getBookingById(id);
  }

  async getBookingByUserAndId(
    userId: number,
    bookingId: number,
  ): Promise<BookingEntity> {
    return await this.bookingRepository.findOne({
      where: { id: bookingId, bookedByUser: { id: userId } },
    });
  }
}
