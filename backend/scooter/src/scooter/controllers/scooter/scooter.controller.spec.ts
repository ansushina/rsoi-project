import { Test, TestingModule } from '@nestjs/testing';
import { ScooterController } from './scooter.controller';

describe('ScooterController', () => {
  let controller: ScooterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScooterController],
    }).compile();

    controller = module.get<ScooterController>(ScooterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
