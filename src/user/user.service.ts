import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddressEntity } from '../address/address.entity';
import { APP_ID, APP_SECRET } from './constant';
import { LoginDto, UserDto } from './dto';
import { UserEntity } from './user.entity';
import { WXBizDataCrypt } from './util/WXBizDataCrypt';
const code2SessionUrl = (code: string) =>
  `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    private readonly httpService: HttpService
  ) {}

  async login(body: Partial<LoginDto>) {
    const { code, encryptedData, iv } = body;
    const data = await this.httpService
      .get(code2SessionUrl(code))
      .toPromise()
      .then(res => res.data);

    const { session_key: sessionKey } = data;
    const pc = new WXBizDataCrypt(APP_ID, sessionKey);
    const encrypted = pc.decryptData(encryptedData, iv);
    const { openId, nickName, avatarUrl, unionId } = encrypted;

    const user = await this.userRepository.findOne({ wechatUnionId: unionId });
    if (!user) {
      const newUser = this.userRepository.create({
        wechatOpenId: openId,
        wechatAvatarUrl: avatarUrl,
        wechatNickname: nickName,
        wechatUnionId: unionId
      });
      await this.userRepository.save(newUser);
      return newUser.toResponseObject(true);
    } else {
      return user.toResponseObject(true);
    }
  }

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

  async signup(body) {
    const { wechatOpenId } = body;
    const user = await this.userRepository.findOne({ wechatOpenId });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.userRepository.create(body);
    await this.userRepository.save(newUser);
    const aaa = await this.userRepository.findOne({ wechatOpenId });
    if (aaa) {
      return aaa.toResponseObject(true);
    }
  }
}
