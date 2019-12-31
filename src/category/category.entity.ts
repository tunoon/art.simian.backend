import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import { CategoryRes } from './dto';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    type => UserEntity,
    creator => creator.categories
  )
  creator: UserEntity;

  @OneToMany(
    type => ProductEntity,
    product => product.category
  )
  products: ProductEntity[];

  @Column()
  value: string;

  @Column({ default: 0 })
  parentId: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  toResponse(): CategoryRes {
    const { id, parentId, value } = this;
    return { id, parentId, value };
  }
}
