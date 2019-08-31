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
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ValidationPipe } from '../common/pipe/validation.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }

  @Get('/get/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: string, @Body() body: Partial<UserDto>) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
