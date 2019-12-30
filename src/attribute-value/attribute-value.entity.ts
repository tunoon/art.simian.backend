import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { AttributeEntity } from '../attribute/attribute.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';

@Entity('attribute-value')
export class AttributeValueEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => UserEntity, user => user.attributeValueList)
  user: UserEntity;

  @ManyToOne(type => AttributeEntity, attribute => attribute.attributeValueList)
  attribute: AttributeEntity;

  @ManyToMany(type => ProductEntity, product => product.attributeValueList)
  productList: ProductEntity[];

  @Column()
  value: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
