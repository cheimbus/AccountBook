import { PickType } from '@nestjs/swagger';
import { AccountBook } from 'src/entities/AccountBook';

export class AccountbookDto extends PickType(AccountBook, [
  'input_money',
  'name',
  'determination',
] as const) {}
