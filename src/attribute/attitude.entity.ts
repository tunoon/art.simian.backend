import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { ColorEntity } from '../color/color.entity';
import { MaterialEntity } from '../material/material.entity';
import { WeightEntity } from '../weight/weight.entity';
import { SizeEntity } from '../size/size.entity';
import { DesignEntity } from '../design/design.entity';

@Entity('attribute')
export class AttributeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => ColorEntity, color => color.attribute)
  color: ColorEntity[];

  @OneToMany(type => SizeEntity, size => size.attribute)
  size: SizeEntity[];

  @OneToMany(type => MaterialEntity, material => material.attribute)
  material: MaterialEntity[];

  @OneToMany(type => WeightEntity, weight => weight.attribute)
  weight: WeightEntity[];

  @OneToMany(type => DesignEntity, design => design.attribute)
  design: DesignEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
