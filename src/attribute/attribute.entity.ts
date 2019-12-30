import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { AttributeValueEntity } from '../attribute-value/attribute-value.entity';
import { UserEntity } from '../user/user.entity';

@Entity('attribute')
export class AttributeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    type => UserEntity,
    user => user.attributeList
  )
  user: UserEntity;

  @OneToMany(
    type => AttributeValueEntity,
    attributeValue => attributeValue.attribute
  )
  attributeValueList: AttributeValueEntity[];

  @Column()
  value: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  toResponse(): any {
    const { id, value, attributeValueList } = this;
    return { id, value, attributeValueList };
  }
}
