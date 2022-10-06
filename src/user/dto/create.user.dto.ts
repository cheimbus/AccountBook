import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/User';

export class CreateUserDto extends PickType(User, [
  'email',
  'nickname',
  'password',
]) {}
