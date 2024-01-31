/* THIRD PARTY IMPORTS */
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Index()
  @Column({
    nullable: false,
    name: 'email',
    unique: true,
  })
  public role: string;

  @ApiProperty()
  @Column({
    nullable: false,
    name: 'token',
  })
  public token: string;

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
