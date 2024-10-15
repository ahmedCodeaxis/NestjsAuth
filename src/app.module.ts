// src/app.module.ts

import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UtilModule } from './util/util.module';
import { AuthModule } from './auth/auth.module';
import { FavModule } from './fav/fav.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Ahmed'),
    ProductModule,
    UserModule,
    OrderModule,
    UtilModule,
    AuthModule,
    FavModule,
   
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
}
}
