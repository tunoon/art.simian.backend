import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { AttributeEntity } from '../attribute/attitude.entity';

@Entity('weight')
export class WeightEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  value: string;

  @ManyToOne(type => AttributeEntity, attribute => attribute.weight)
  attribute: AttributeEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
