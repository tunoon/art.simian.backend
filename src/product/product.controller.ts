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
import { ProductService } from './product.service';

import { ProductDto } from './dto';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('/create/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  createProduct(
    @Param('id') categoryId: string,
    @User('id') userId: string,
    @Body() body: ProductDto
  ) {
    return this.productService.createProduct(categoryId, userId, body);
  }
}
