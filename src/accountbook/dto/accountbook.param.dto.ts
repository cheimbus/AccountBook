import { ApiProperty } from '@nestjs/swagger';

export class AccountBookParamDto {
  @ApiProperty({
    example: 1,
    description:
      'account_book_id에 속하는 expenses를 불러오기 위해 작성해야 한다. accountbookid가 1 인 것을 불러옵니다.',
  })
  accountbookid: number;
}
