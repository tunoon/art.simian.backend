import { IsString } from 'class-validator';

export class AttributeValueDto {
  @IsString()
  value: string;
}
