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
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/get/all')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Delete('/delete/all')
  deleteAllCategories() {
    return this.categoryService.deleteAllCategories();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  createCategory(@User() user: UserEntity, @Body() body: CategoryDto) {
    return this.categoryService.createCategory(user, body);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  updateCategory(@Param('id') id: number, @Body() body: Partial<CategoryDto>) {
    return this.categoryService.updateCategory(id, body);
  }

  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
