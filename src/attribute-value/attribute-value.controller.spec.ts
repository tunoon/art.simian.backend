import { Test, TestingModule } from '@nestjs/testing';
import { AttributeValueController } from './attribute-value.controller';

describe('AttributeValue Controller', () => {
  let controller: AttributeValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeValueController]
    }).compile();

    controller = module.get<AttributeValueController>(AttributeValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
