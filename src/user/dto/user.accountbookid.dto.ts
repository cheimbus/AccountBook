import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class UserAccountBookIdDto extends PickType(Users, [
  'accountbookId',
] as const) {}
