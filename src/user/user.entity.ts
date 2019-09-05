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
  // constructor(partial: Partial<UserEntity>) {
  //   Object.assign(this, partial);
  // }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'tinyint' }) // 1 male / 2 female
  gender: number;

  @OneToMany(type => AddressEntity, addressList => addressList.user)
  addressList: AddressEntity[];

  // wechat info
  @Column()
  wechatAvatarUrl: string;

  @Column()
  wechatNickname: string;

  @Column()
  wechatOpenId: string;

  @Column()
  wechatSessionKey: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = false): any {
    const { id, nickname, token } = this;
    const responseObject: any = {
      id,
      nickname
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, nickname } = this;
    return sign(
      {
        id,
        nickname
      },
      process.env.SECRET,
      { expiresIn: '7d' }
    );
  }
}
