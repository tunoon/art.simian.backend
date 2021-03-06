import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AddressEntity } from '../address/address.entity';
import { AttributeValueEntity } from '../attribute-value/attribute-value.entity';
import { AttributeEntity } from '../attribute/attribute.entity';
import { CategoryEntity } from '../category/category.entity';
import { ProductEntity } from '../product/product.entity';
import { Role } from './constant';

@Entity('user')
export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: Role.CUSTOMER })
  role: number;

  // 用户地址
  @OneToMany(
    type => AddressEntity,
    address => address.user
  )
  addressList: AddressEntity[];

  // 管理员创建的category
  @OneToMany(
    type => CategoryEntity,
    category => category.creator
  )
  categories: CategoryEntity[];

  // 管理员创建的product
  @OneToMany(
    type => ProductEntity,
    product => product.creator
  )
  products: ProductEntity[];

  // 管理员创建的attribute
  @OneToMany(
    type => AttributeEntity,
    attribute => attribute.creator
  )
  attributes: AttributeEntity[];

  // 管理员创建的attributeValue
  @OneToMany(
    type => AttributeValueEntity,
    attributeValue => attributeValue.creator
  )
  attributeValueList: AttributeValueEntity[];

  // wechat info
  @Column({ nullable: true })
  wechatAvatarUrl: string;

  @Column({ nullable: true })
  wechatNickname: string;

  @Column({ unique: true, nullable: true })
  wechatOpenId: string;

  @Column({ unique: true, nullable: true })
  wechatUnionId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  // async comparePassword(attempt: string): Promise<boolean> {
  //   return await compare(attempt, this.password);
  // }

  toResponseObject(showToken = false): any {
    const { id, token, wechatAvatarUrl, wechatNickname } = this;
    const responseObject: {
      id: string;
      wechatAvatarUrl: string;
      wechatNickname: string;
      token?: string;
    } = {
      id,
      wechatAvatarUrl,
      wechatNickname
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, wechatUnionId } = this;
    return sign(
      {
        id,
        wechatUnionId
      },
      process.env.SECRET,
      { expiresIn: '7d' }
    );
  }
}
