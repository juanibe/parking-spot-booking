/* Middleware that block the endpoints if it is in switch mode */

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RoleEnum } from 'src/modules/user/enum';
import { BookingService } from '../booking.service';

@Injectable()
export class BookingPermissionMiddleware implements NestMiddleware {
  constructor(private readonly bookingService: BookingService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const baseError = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const url = req.url;
    const method: string = req.method;
    const user = (req as any).user;

    if (url === '/bookings') {
      if (user.role !== RoleEnum.ADMIN) {
        throw baseError;
      }
    } else if (
      url.match(/^\/bookings\/\d+$/) &&
      (method === 'GET' || method === 'PUT' || method === 'DELETE')
    ) {
      if (user.role === RoleEnum.ADMIN) return next();
      else {
        const resourceId = url.split('/')[2];
        const bookingFound = await this.bookingService.getBookingByUserAndId(
          Number(user.id),
          Number(resourceId),
        );

        if (!bookingFound) throw baseError;
      }
    }
    next();
  }
}
