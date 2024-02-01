/* Middleware that block the endpoints if it is in switch mode */

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RoleEnum } from 'src/modules/user/enum';

@Injectable()
export class ParkingSpotPermissionMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    const baseError = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const user = (req as any).user;
    console.log(user);
    if (user.role !== RoleEnum.ADMIN) throw baseError;
    next();
  }
}
