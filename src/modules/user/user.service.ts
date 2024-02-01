/* THIRD PARTY IMPORTS */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

/* ===================================================== */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByApiToken(token: string): Promise<any> {
    return await this.userRepository.findOne({ where: { token } });
  }
}
