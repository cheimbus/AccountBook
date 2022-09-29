import { ApiProperty } from '@nestjs/swagger';

export class AccountBookQueryDto {
  @ApiProperty({
    example: 1,
    description: '불러오고싶은 페이지를 입력합니다.',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description:
      '몇개씩 가져올 지 입력합니다. 10을 입력하면 10개씩 가져옵니다.',
  })
  take: number;

  @ApiProperty({
    example: 'DESC',
    description:
      '내림차순인지 오름차순인지 작성합니다. DESC는 내림차순, ASC는 오름차순입니다.',
  })
  order: string;
}
