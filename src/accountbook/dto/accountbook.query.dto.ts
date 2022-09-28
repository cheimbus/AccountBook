import { ApiProperty } from '@nestjs/swagger';

export class AccountBookQueryDto {
  @ApiProperty({
    example: 1,
    description: '원하는 페이지를 입력',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'expenses를 몇개를 가져올지 입력',
  })
  take: number;

  @ApiProperty({
    example: 'DESC, ASC',
    description: '내림차순인지 오름차순인지 작성',
  })
  order: string;
}
