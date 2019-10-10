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
import { AuthGuard } from '../common/guard/auth.guard';
import { ValidationPipe } from '../common/pipe/validation.pipe';

import { CategoryDto } from './dto';

import { CategoryService } from './category.service';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/get/all')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  createCategory(@Body() body: CategoryDto) {
    return this.categoryService.createCategory(body);
  }
}
