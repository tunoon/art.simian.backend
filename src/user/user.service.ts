import {
  Injectable,
  HttpStatus,
  HttpException,
  HttpService
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { map, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { APPID, APPSECRET } from './constant';
import { AddressEntity } from '../address/address.entity';

const code2SessionUrl = (code: string) =>
  `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${code}&grant_type=authorization_code`;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    private readonly httpService: HttpService
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

  login(body: any) {
    const { code, encryptedData, iv, signature } = body;
    return this.httpService
      .get(code2SessionUrl(code))
      .pipe(
        mergeMap(response => {
          const { session_key, openid } = response.data;
          return this.userRepository.findOne({
            wechatOpenId: openid
          });
          // return { statusCode: HttpStatus.OK, message: '登录成功' };
        })
      )
      .pipe(
        map(response => {
          if (response) {
            console.log(response.wechatAvatarUrl);
          } else {
          }
        })
      );
    // const { nickname, password } = body;
    // const user = await this.userRepository.findOne({ nickname });
    // if (!user || !(await user.comparePassword(password))) {
    //   throw new HttpException(
    //     'Invalid username/password',
    //     HttpStatus.BAD_REQUEST
    //   );
    // }
    // return user.toResponseObject(true);
  }

  async signup(body: Partial<UserDto>) {
    const { nickname } = body;
    const user = await this.userRepository.findOne({ nickname });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create(body);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
