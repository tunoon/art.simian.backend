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
import { AttributeEntity } from '../attribute/attribute.entity';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    type => UserEntity,
    creator => creator.products
  )
  creator: UserEntity;

  @ManyToOne(
    type => CategoryEntity,
    category => category.products
  )
  category: CategoryEntity;

  @ManyToMany(
    type => AttributeEntity,
    attribute => attribute.products
  )
  @JoinTable()
  attributes: AttributeEntity[];

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
