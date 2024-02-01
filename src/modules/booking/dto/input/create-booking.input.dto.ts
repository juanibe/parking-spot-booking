// Third-party imports
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

export class CreateBookingInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  start: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  end: Date;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  parkingSpot: number;

  @Type(() => UserEntity)
  @ApiProperty()
  bookedByUser?: UserEntity;
}
