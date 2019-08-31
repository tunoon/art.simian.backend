import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UsePipes
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';
import { ValidationPipe } from '../common/pipe/validation.pipe';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() body: AddressDto) {
    return this.addressService.createAddress(body);
  }
}
