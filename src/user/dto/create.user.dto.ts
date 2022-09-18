import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class CreateUserDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
]) {}
