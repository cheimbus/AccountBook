import { ApiProperty } from '@nestjs/swagger';

export class CreateTodayExpensesDto {
  @ApiProperty({
    example: 1,
    description: 'TodayExpenses.account_book_id 입니다.',
  })
  id: number;

  @ApiProperty({
    example: 5000,
    description: '지출 비용입니다.',
  })
  expenses: number;

  @ApiProperty({
    example: '스타벅스 아메리카노',
    description: '지출 비용을 메모합니다.',
  })
  memo: string;
}
