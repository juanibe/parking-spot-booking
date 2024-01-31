/* THIRD PARTY IMPORTS */
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BookingEntity } from 'src/modules/booking/entities/booking.entity';
import { RoleEnum } from '../enum';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */

/* ===================================================== */

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  public id: number;

  @ApiProperty()
  @Index()
  @Column({
    nullable: false,
    name: 'first_name',
  })
  public firstName: string;

  @ApiProperty()
  @Index()
  @Column({
    nullable: false,
    name: 'last_name',
  })
  public lastName: string;

  @ApiProperty()
  @Index()
  @Column({
    nullable: false,
    name: 'email',
    unique: true,
  })
  public email: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.STANDARD,
  })
  privacy: RoleEnum;

  @ApiProperty()
  @Column({
    nullable: false,
    name: 'token',
  })
  public token: string;

  @OneToMany(() => BookingEntity, (booking) => booking.bookedByUser)
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
