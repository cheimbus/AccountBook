import { ApiProperty } from '@nestjs/swagger';

export class ModifyUserDto {
  @ApiProperty({
    example: 'siujjang@gmail.com',
  })
  email: string;
  @ApiProperty({
    example: '시우는가계부',
  })
  nickname: string;
  @ApiProperty({
    example: '123123good',
  })
  password: string;
}
