import { Controller, Body, Param, Get, Post, Put } from '@nestjs/common';
import { UserService, IUser } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Post('/create')
  createUser(@Body() data: Partial<IUser>) {
    return this.userService.createUser(data);
  }
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() data: Partial<IUser>) {
    return this.userService.updateUser(id, data);
  }
}
