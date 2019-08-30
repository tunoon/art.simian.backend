import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('user')
export class UserEntity {
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
}
