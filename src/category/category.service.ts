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
    const Categories = await this.categoryRepository.find();
    return Categories.map((category: CategoryEntity) => category.toResponse());
  }

  async deleteAllCategories() {
    const Categories = await this.categoryRepository.find();
    await this.categoryRepository.remove(Categories);
    return { message: 'delete successfully', statusCode: HttpStatus.OK };
  }

  async createCategory(creator: UserEntity, body: CategoryDto) {
    const isExist = await this.categoryRepository.findOne({
      value: body.value
    });
    if (isExist) {
      return { message: 'category already exist' };
    }
    const category = this.categoryRepository.create({ ...body, creator });
    await this.categoryRepository.save(category);
    return category.toResponse();
  }

  async updateCategory(id: number, body: Partial<CategoryDto>) {
    const category = await this.categoryRepository.findOne({
      where: { id }
    });
    if (!category) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.categoryRepository.update({ id }, body);
    return { ...category.toResponse(), ...body };
  }

  async deleteCategory(id: number) {
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
