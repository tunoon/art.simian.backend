import { IsNumber, IsString } from 'class-validator';
import { CategoryDto } from './category.dto';

export class CategoryRes extends CategoryDto {
  @IsNumber()
  id: number;

  @IsNumber()
  parentId: number;
}
