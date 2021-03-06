import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { AddressController } from './address.controller';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
