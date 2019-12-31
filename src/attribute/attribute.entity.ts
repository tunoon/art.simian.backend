import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { AttributeValueEntity } from '../attribute-value/attribute-value.entity';
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('attribute')
export class AttributeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    type => UserEntity,
    creator => creator.attributes
  )
  creator: UserEntity;

  @ManyToMany(
    type => ProductEntity,
    product => product.attributes
  )
  products: ProductEntity;

  @OneToMany(
    type => AttributeValueEntity,
    attributeValue => attributeValue.attribute
  )
  attributeValues: AttributeValueEntity[];

  @Column()
  value: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  toResponse(): any {
    const { id, value, attributeValues } = this;
    return { id, value, attributeValues };
  }
}
