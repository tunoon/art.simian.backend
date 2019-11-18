import { compare, hash } from 'bcryptjs';
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
import { CategoryEntity } from '../category/category.entity';

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

  @Column({ nullable: true })
  role: number;

  @OneToMany(type => AddressEntity, address => address.user)
  addressList: AddressEntity[];

  @OneToMany(type => CategoryEntity, category => category.user)
  categories: CategoryEntity[];

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

  toResponseObject(showToken: boolean = false): any {
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
