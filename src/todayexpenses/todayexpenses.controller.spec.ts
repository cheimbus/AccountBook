import { Test, TestingModule } from '@nestjs/testing';
import { TodayexpensesController } from './todayexpenses.controller';

describe('TodayexpensesController', () => {
  let controller: TodayexpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodayexpensesController],
    }).compile();

    controller = module.get<TodayexpensesController>(TodayexpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
