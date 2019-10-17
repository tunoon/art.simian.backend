import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(type => UserEntity, user => user.categories)
  user: UserEntity;

  @OneToMany(type => ProductEntity, product => product.category)
  productList: ProductEntity[];

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
