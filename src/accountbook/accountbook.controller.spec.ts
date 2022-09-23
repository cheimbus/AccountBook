import { Test, TestingModule } from '@nestjs/testing';
import { AccountbookController } from './accountbook.controller';

describe('AccountbookController', () => {
  let controller: AccountbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountbookController],
    }).compile();

    controller = module.get<AccountbookController>(AccountbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
