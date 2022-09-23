import { Test, TestingModule } from '@nestjs/testing';
import { AccountbookService } from './accountbook.service';

describe('AccountbookService', () => {
  let service: AccountbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountbookService],
    }).compile();

    service = module.get<AccountbookService>(AccountbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
