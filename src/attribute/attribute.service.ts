import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AttributeEntity } from './attribute.entity';
import { AttributeDto } from './dto';
@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(AttributeEntity)
    private attributeRepository: Repository<AttributeEntity>
  ) {}

  async getAllAttributes() {
    const Attributes = await this.attributeRepository.find();
    return Attributes;
  }

  async deleteAllAttributes() {
    const Attributes = await this.attributeRepository.find();
    await this.attributeRepository.remove(Attributes);
    return { message: 'delete successfully', statusCode: HttpStatus.OK };
  }

  async createAttribute(creator: UserEntity, body: AttributeDto) {
    const isExist = await this.attributeRepository.findOne({
      value: body.value
    });
    if (isExist) {
      return { message: 'attribute already exist' };
    }
    const attribute = this.attributeRepository.create({ ...body, creator });
    await this.attributeRepository.save(attribute);
    return attribute;
  }

  async updateAttribute(id: number, body: Partial<AttributeDto>) {
    const attribute = await this.attributeRepository.findOne({
      where: { id }
    });
    if (!attribute) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.attributeRepository.update({ id }, body);
    return { ...attribute, ...body };
  }

  async deleteAttribute(id: number) {
    const attribute = await this.attributeRepository.findOne({
      where: { id }
    });
    if (!attribute) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.attributeRepository.delete({ id });
    return attribute;
  }
}
