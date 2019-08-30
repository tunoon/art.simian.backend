import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface IUser {
  nickname: string;
  phone: string;
  email: string;
  password: string;
  gender: number;
  wechatAvatarUrl: string;
  wechatNickname: string;
  wechatOpenId: string;
  wechatSessionKey: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}
  async getAllUsers() {
    return await this.userRepository.find();
  }
  async createUser(data: Partial<IUser>) {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }
  async getUser(id: string) {
    const user = await this.userRepository.findOne({ id });
    return user;
  }
  async updateUser(id: string, data: Partial<IUser>) {
    await this.userRepository.update({ id }, data);
    const user = await this.userRepository.findOne({ id });
    return user;
  }
}
