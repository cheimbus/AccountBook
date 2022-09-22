import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class ModifyUserDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
]) {}
