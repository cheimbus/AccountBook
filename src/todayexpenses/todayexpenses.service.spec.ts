import { Test, TestingModule } from '@nestjs/testing';
import { TodayexpensesService } from './todayexpenses.service';

describe('TodayexpensesService', () => {
  let service: TodayexpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodayexpensesService],
    }).compile();

    service = module.get<TodayexpensesService>(TodayexpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
