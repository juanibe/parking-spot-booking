/* THIRD PARTY IMPORTS */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

/* GLOBAL IMPORTS */
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';

/* LOCAL IMPORTS */

/* ===================================================== */

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
