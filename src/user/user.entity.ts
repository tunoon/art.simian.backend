import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AddressEntity } from '../address/address.entity';

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

  @OneToMany(type => AddressEntity, addressList => addressList.user)
  addressList: AddressEntity[];

  // wechat info
  @Column({ nullable: true })
  wechatAvatarUrl: string;

  @Column({ nullable: true })
  wechatNickname: string;

  @Column({ unique: true, nullable: true })
  wechatOpenId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await hash(this.password, 10);
  // }

  // async comparePassword(attempt: string): Promise<boolean> {
  //   return await compare(attempt, this.password);
  // }

  toResponseObject(showToken: boolean = false): any {
    const { id, wechatNickname, token } = this;
    const responseObject: {
      id: string;
      token?: string;
    } = {
      id
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { wechatOpenId } = this;
    return sign(
      {
        wechatOpenId
      },
      process.env.SECRET,
      { expiresIn: '7d' }
    );
  }
}
