import { IsString } from 'class-validator';

export class CategoryRes {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  value: string;
}
