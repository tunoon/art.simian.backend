import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AttributeValueEntity } from '../attribute-value/attribute-value.entity';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => UserEntity, user => user.productList)
  user: UserEntity;

  @ManyToOne(type => CategoryEntity, category => category.productList)
  category: CategoryEntity;

  @ManyToMany(
    type => AttributeValueEntity,
    attributeValue => attributeValue.productList
  )
  @JoinTable()
  attributeValueList: AttributeValueEntity[];

  @Column()
  listPrice: string;

  @Column()
  discountPrice: string;

  @Column({ type: 'text' })
  desc: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
