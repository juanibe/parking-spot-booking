/* THIRD PARTY IMPORTS */
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
