import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return categories.map((category: CategoryEntity) => category.toResponse());
  }

  async deleteAllCategories() {
    const categories = await this.categoryRepository.find();
    await this.categoryRepository.remove(categories);
    return { message: 'delete successfully', statusCode: HttpStatus.OK };
  }

  async createCategory(user: UserEntity, body: CategoryDto) {
    const category = this.categoryRepository.create({ ...body, user });
    await this.categoryRepository.save(category);
    return category.toResponse();
  }

  async updateCategory(id: string, body: Partial<CategoryDto>) {
    const category = await this.categoryRepository.findOne({
      where: { id }
    });
    if (!category) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.categoryRepository.update({ id }, body);
    return { ...category.toResponse(), ...body };
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id }
    });
    if (!category) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.categoryRepository.delete({ id });
    return category.toResponse();
  }
}
