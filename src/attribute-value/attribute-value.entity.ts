import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { AttributeEntity } from '../attribute/attribute.entity';
import { UserEntity } from '../user/user.entity';

@Entity('attribute-value')
export class AttributeValueEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    type => UserEntity,
    creator => creator.attributeValueList
  )
  creator: UserEntity;

  @ManyToOne(
    type => AttributeEntity,
    attribute => attribute.attributeValues
  )
  attribute: AttributeEntity;

  @Column()
  value: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
