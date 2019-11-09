import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { CategoryEntity } from '../category/category.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(type => CategoryEntity, category => category.productList)
  category: CategoryEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
