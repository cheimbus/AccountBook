import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TodayExpensesParamDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'account_book_id 값을 받아옵니다.',
  })
  accountbookid: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'TodayExpenses를 불러올 id값입니다.',
  })
  id: string;
}
