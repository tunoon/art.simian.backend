import { IsString } from 'class-validator';

export class AttributeDto {
  @IsString()
  value: string;
}
