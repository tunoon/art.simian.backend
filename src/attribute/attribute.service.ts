import { Injectable } from '@nestjs/common';
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

  async createAttribute(user: UserEntity, body: AttributeDto) {
    const isExist = await this.attributeRepository.findOne({
      value: body.value
    });
    if (isExist) {
      return { message: 'attribute already exist' };
    }
    const attribute = this.attributeRepository.create({ ...body, user });
    await this.attributeRepository.save(attribute);
    return attribute.toResponse();
  }
}
