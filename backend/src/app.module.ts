import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { loggerConf } from './logger';
import * as ormConfig from './orm.config';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtTokenMiddleware, LoggerInterceptor } from './shared';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    WinstonModule.forRoot(loggerConf),
    AuthModule,
    UserModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtTokenMiddleware)
      .exclude('api/auth/(.*)')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
