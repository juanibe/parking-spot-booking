/* THIRD PARTY IMPORTS */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BookingEntity } from 'src/modules/booking/entities/booking.entity';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */

/* ===================================================== */

@Entity('parking_spots')
export class ParkingSpotEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  public id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    name: 'name',
  })
  public name: string;

  @OneToMany(() => BookingEntity, (booking) => booking.parkingSpot)
  public bookings: BookingEntity[];

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
