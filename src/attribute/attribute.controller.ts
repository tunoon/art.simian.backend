import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard, ValidationPipe } from '../common';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';

import { AttributeService } from './attribute.service';
import { AttributeDto } from './dto';

@Controller('api/attribute')
export class AttributeController {
  constructor(private attributeService: AttributeService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  createCategory(@User() user: UserEntity, @Body() body: AttributeDto) {
    return this.attributeService.createAttribute(user, body);
  }
}
