import { IsString, IsEmail, IsMobilePhone } from 'class-validator';
export class UserDto {
  @IsString()
  nickname: string;
  @IsMobilePhone('zh-CN')
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;

  @IsString()
  wechatAvatarUrl: string;
  @IsString()
  wechatNickname: string;
  @IsString()
  wechatOpenId: string;
}
