/* THIRD PARTY IMPORTS */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpotEntity } from './entities/parking-spot.entity';
import { Repository } from 'typeorm';
import { BookingEntity } from '../booking/entities/booking.entity';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */

/* ===================================================== */

@Injectable()
export class ParkingSpotService {
  constructor(
    @InjectRepository(ParkingSpotEntity)
    private readonly parkingSpotRepository: Repository<ParkingSpotEntity>,
  ) {}

  async getParkingSpotById(id: number): Promise<any> {
    const parkingSpotFound = await this.parkingSpotRepository.findOne({
      where: { id },
    });
    if (!parkingSpotFound)
      throw new HttpException('ParkingSpotNotFound', HttpStatus.NOT_FOUND);

    return parkingSpotFound;
  }

  async getAllParkingSpots(): Promise<any> {
    return await this.parkingSpotRepository.find();
  }

  async createParkingSpot(input: any): Promise<any> {
    return await this.parkingSpotRepository.save(input);
  }

  async editParkingSpotById(id: number, input: any): Promise<any> {
    try {
      await this.parkingSpotRepository.update(id, input);
      return await this.getParkingSpotById(id);
    } catch (error) {
      return { success: false };
    }
  }

  //TODO Success dto
  async deleteParkingSpotById(id: number): Promise<{ success: boolean }> {
    try {
      await this.getParkingSpotById(id);

      await this.parkingSpotRepository.manager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.delete(BookingEntity, {
            parkingSpot: id,
          });
          await transactionalEntityManager.delete(ParkingSpotEntity, { id });
        },
      );
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
