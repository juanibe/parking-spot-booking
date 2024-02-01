import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly resource: string,
    @Inject(UserService) userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const resourceId = request.url;
    const user = (request as any).user;

    console.log(user);

    switch (this.resource) {
      case 'get_all_bookings':
        if (user.role === 'admin') {
          return true;
        }
        return false;
        break;

      case 'get_by_id':
        if (user.role === 'admin') {
          return true;
        }
        return false;
        break;
    }

    console.log(request.url);

    return false;
  }
}
