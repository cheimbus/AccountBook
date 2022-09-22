import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class LogInDto extends PickType(Users, [
  'id',
  'email',
  'password',
] as const) {}
