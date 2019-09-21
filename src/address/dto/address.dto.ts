import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
export class AddressDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  province: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  detail: string;

  @IsBoolean()
  isDefault: boolean;
}
