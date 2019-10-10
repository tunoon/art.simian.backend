import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

import { CategoryEntity } from './category.entity';
import { CategoryDto } from './dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async getAllCategories() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async createCategory(body: CategoryDto) {
    const category = this.categoryRepository.create(body);
    await this.categoryRepository.save(category);
    return category;
  }
}
