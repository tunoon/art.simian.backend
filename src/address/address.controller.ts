import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  UseGuards
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';
import { ValidationPipe } from '../common/pipe/validation.pipe';
import { AuthGuard } from '../common/guard/auth.guard';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('api/address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('/all')
  @UseGuards(AuthGuard)
  getAllUsers(@User() user: UserEntity) {
    return this.addressService.getAddressList(user);
  }

  @Get('/get/:id')
  getAddress(@Param('id') id: string) {
    return this.addressService.getAddress(id);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  createAddress(@User() user: UserEntity, @Body() body: AddressDto) {
    return this.addressService.createAddress(user, body);
  }

  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  updateAddress(@Param('id') id: string, @Body() body: Partial<AddressDto>) {
    return this.addressService.updateAddress(id, body);
  }

  @Delete('/delete/:id')
  deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddress(id);
  }
}
