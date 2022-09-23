import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class UserDto extends PickType(Users, [
  'id',
  'email',
  'password',
] as const) {}
