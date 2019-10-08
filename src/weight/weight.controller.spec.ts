import { Test, TestingModule } from '@nestjs/testing';
import { WeightController } from './weight.controller';

describe('Weight Controller', () => {
  let controller: WeightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightController],
    }).compile();

    controller = module.get<WeightController>(WeightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
