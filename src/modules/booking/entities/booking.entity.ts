/* THIRD PARTY IMPORTS */
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';
import { ParkingSpotEntity } from '../../parking-spot/entities/parking-spot.entity';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */

/* ===================================================== */

@Entity('bookings')
export class BookingEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  public id: number;

  @ManyToOne(() => UserEntity, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  bookedByUser: UserEntity;

  @ManyToOne(() => ParkingSpotEntity, (parkingSpot) => parkingSpot.bookings)
  @JoinColumn({ name: 'parking_spot' })
  public parkingSpot: ParkingSpotEntity;

  @Column({
    type: 'timestamptz',
    name: 'start',
  })
  start: Date;

  @Column({
    type: 'timestamptz',
    name: 'end',
  })
  end: Date;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: true,
  })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    nullable: true,
  })
  public updatedAt: Date;
}
