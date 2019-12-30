import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AddressModule } from './address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttributeValueModule } from './attribute-value/attribute-value.module';
import { AttributeModule } from './attribute/attribute.module';
import { CategoryModule } from './category/category.module';
import { HttpExceptionFilter, LoggingInterceptor } from './common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

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
    AttributeValueModule
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
