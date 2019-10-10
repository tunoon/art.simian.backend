import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { AttributeEntity } from '../attribute/attitude.entity';

@Entity('color')
export class MaterialEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  value: string;

  @ManyToOne(type => AttributeEntity, attribute => attribute.material)
  attribute: AttributeEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
