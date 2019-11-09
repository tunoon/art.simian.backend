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

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => UserEntity, user => user.categories)
  user: UserEntity;

  @OneToMany(type => ProductEntity, product => product.category)
  productList: ProductEntity[];

  @Column()
  name: string;

  @Column()
  value: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  toResponse(): { id: string; value: string } {
    const { id, value } = this;
    return { id, value };
  }
}
