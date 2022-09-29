import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty({
    example: 'siu@naver.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'A$dawjdo123',
    required: true,
  })
  password: string;
}
{
}
