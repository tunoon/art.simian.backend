import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { AttributeEntity } from '../attribute/attitude.entity';

@Entity('size')
export class SizeEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  value: string;

  @ManyToOne(type => AttributeEntity, attribute => attribute.size)
  attribute: AttributeEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
