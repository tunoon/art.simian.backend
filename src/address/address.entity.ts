import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AddressDto } from './dto/address.dto';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => UserEntity, user => user.addressList)
  user: UserEntity;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  province: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  detail: string;

  @Column()
  isDefault: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  toResponseObject(showToken: boolean = false): AddressDto {
    const { user, ...rest } = this;
    return rest;
  }
}
