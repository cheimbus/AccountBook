import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/User';

export class UserDto extends PickType(User, [
  'id',
  'email',
  'password',
] as const) {}
