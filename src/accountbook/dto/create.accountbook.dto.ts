import { PickType } from '@nestjs/swagger';
import { AccountBook } from 'src/entities/AccountBook';

export class CreateAccountbookDto extends PickType(AccountBook, [
  'name',
  'determination',
  'input_money',
]) {}
