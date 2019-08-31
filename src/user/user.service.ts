import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(body: UserDto) {
    const user = await this.userRepository.create(body);
    await this.userRepository.save(user);
    return user;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: string, body: Partial<UserDto>) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update({ id }, body);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete({ id });
    return user;
  }
}
