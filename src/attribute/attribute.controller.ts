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
import { AttributeService } from './attribute.service';
import { AttributeDto } from './dto';

@Controller('api/attribute')
export class AttributeController {
  constructor(private attributeService: AttributeService) {}

  @Get('/get/all')
  getAllAttributes() {
    return this.attributeService.getAllAttributes();
  }

  @Delete('/delete/all')
  deleteAllAttributes() {
    return this.attributeService.deleteAllAttributes();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  createCategory(@User() user: UserEntity, @Body() body: AttributeDto) {
    return this.attributeService.createAttribute(user, body);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  updateCategory(@Param('id') id: number, @Body() body: Partial<AttributeDto>) {
    return this.attributeService.updateAttribute(id, body);
  }

  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  deleteCategory(@Param('id') id: number) {
    return this.attributeService.deleteAttribute(id);
  }
}
