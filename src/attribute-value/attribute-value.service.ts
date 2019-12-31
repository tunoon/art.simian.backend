import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AttributeEntity } from '../attribute/attribute.entity';
import { AttributeValueEntity } from './attribute-value.entity';
import { AttributeValueDto } from './dto';
@Injectable()
export class AttributeValueService {
  constructor(
    @InjectRepository(AttributeValueEntity)
    private attributeValueRepository: Repository<AttributeValueEntity>
  ) {}

  async createAttributeValue(
    creator: UserEntity,
    attribute: AttributeEntity,
    body: AttributeValueDto
  ) {
    const attributeValue = this.attributeValueRepository.create({
      ...body,
      creator,
      attribute
    });
    await this.attributeValueRepository.save(attributeValue);
    return attributeValue;
  }
}
