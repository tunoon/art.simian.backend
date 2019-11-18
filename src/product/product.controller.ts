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
import { ProductDto } from './dto';

@Controller('api/product')
export class ProductController {
  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  createProduct(@User() user: UserEntity, @Body() body: ProductDto) {
    return {};
  }
}
