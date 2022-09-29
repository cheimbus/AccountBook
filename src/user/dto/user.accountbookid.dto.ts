import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디.',
  })
  id: number;
}
