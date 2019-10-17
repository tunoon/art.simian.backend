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
  updateCategory(@Param('id') id: string, @Body() body: Partial<CategoryDto>) {
    return this.categoryService.updateCategory(id, body);
  }

  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
