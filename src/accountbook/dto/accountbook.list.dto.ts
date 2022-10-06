import { PickType } from '@nestjs/swagger';
import { AccountBook } from 'src/entities/AccountBook';

export class AccountbookListDto extends PickType(AccountBook, [
  'id',
  'inputMoney',
  'name',
  'determination',
  'currentMoney',
  'createdAt',
] as const) {}
