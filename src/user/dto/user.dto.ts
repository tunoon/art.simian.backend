import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';
export class UserDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;
  @IsString()
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsInt()
  gender: number;

  wechatAvatarUrl: string;
  @IsString()
  wechatNickname: string;
  @IsString()
  wechatOpenId: string;
  @IsString()
  wechatSessionKey: string;
}

export class LoginDto {
  code: string;
  encryptedData: string;
  iv: string;
  signature: string;
}
