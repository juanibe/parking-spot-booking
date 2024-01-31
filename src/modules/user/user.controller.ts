/* THIRD PARTY IMPORTS */
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/* GLOBAL IMPORTS */

/* LOCAL IMPORTS */
import { UserService } from './user.service';

/* ===================================================== */

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
