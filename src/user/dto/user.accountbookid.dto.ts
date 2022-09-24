import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class UserIdDto extends PickType(Users, ['id'] as const) {}
