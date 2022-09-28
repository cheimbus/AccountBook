import { PickType } from '@nestjs/swagger';
import { AccountBook } from 'src/entities/AccountBook';

export class AccountbookListDto extends PickType(AccountBook, [
  'id',
  'input_money',
  'name',
  'determination',
  'current_money',
  'createdAt',
] as const) {}
