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
export class ColorEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  value: string;

  @Column()
  images: string;

  @ManyToOne(type => AttributeEntity, attribute => attribute.color)
  attribute: AttributeEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
