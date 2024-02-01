/* Middleware that block the endpoints if it is in switch mode */

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers['api_token'] as string;
    if (!token || typeof token !== 'string')
      throw new HttpException(
        'Unauthorized:ApiTokenNotProvidedOrInvalid',
        HttpStatus.UNAUTHORIZED,
      );

    const foundUser = await this.userService.getUserByApiToken(token);

    if (!foundUser)
      throw new HttpException(
        'Unauthorized:ApiTokenNotProvidedOrInvalid',
        HttpStatus.UNAUTHORIZED,
      );

    req['user'] = foundUser;

    next();
  }
}
