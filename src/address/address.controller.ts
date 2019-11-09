import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { AuthGuard, ValidationPipe } from '../common';

import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';

@Controller('api/address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('/get/all')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  getAddressList(@User() user: UserEntity) {
    return this.addressService.getAddressList(user);
  }

  @Get('/get/:id')
  getAddress(@Param('id') id: string) {
    return this.addressService.getAddress(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  createAddress(@User() user: UserEntity, @Body() body: AddressDto) {
    return this.addressService.createAddress(user, body);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  updateAddress(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() body: Partial<AddressDto>
  ) {
    return this.addressService.updateAddress(user, id, body);
  }

  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  deleteAddress(@User() user: UserEntity, @Param('id') id: string) {
    return this.addressService.deleteAddress(user, id);
  }
}
