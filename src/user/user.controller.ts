import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, LoginDto } from './dto/user.dto';
import { User } from './user.decorator';
import { AuthGuard } from '../common/guard/auth.guard';
import { ValidationPipe } from '../common/pipe/validation.pipe';


@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }

  @Get('/get/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  updateUser(@Param('id') id: string, @Body() body: Partial<UserDto>) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post('/login')
  // @UsePipes(ValidationPipe)
  login(@Body() body: Partial<LoginDto>) {
    return this.userService.login(body);
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() body: Partial<UserDto>) {
    return this.userService.signup(body);
  }
}
