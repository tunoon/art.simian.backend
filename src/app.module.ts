import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { AttributeModule } from './attribute/attribute.module';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { MaterialModule } from './material/material.module';
import { WeightModule } from './weight/weight.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zhf921210',
      database: 'art_simian',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
      logging: true
    }),
    UserModule,
    ProductModule,
    AddressModule,
    CategoryModule,
    AttributeModule,
    ColorModule,
    SizeModule,
    MaterialModule,
    WeightModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    AppService
  ]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
