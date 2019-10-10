import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { AttributeEntity } from '../attribute/attitude.entity';

@Entity('design')
export class DesignEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  value: string;

  @ManyToOne(type => AttributeEntity, attribute => attribute.design)
  attribute: AttributeEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
