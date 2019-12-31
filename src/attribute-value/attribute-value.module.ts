import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValueController } from './attribute-value.controller';
import { AttributeValueService } from './attribute-value.service';
import { AttributeValueEntity } from './attribute-value.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AttributeValueEntity])],

  controllers: [AttributeValueController],
  providers: [AttributeValueService]
})
export class AttributeValueModule {}
