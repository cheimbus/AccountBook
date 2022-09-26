import { ApiProperty } from '@nestjs/swagger';

export class TodayExpensesModifyDto {
  @ApiProperty({
    example: 1,
    description: 'today_expenses.id',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'account_book_id foreignkey를 받아와서 접근함',
  })
  accountBookId: number;

  @ApiProperty({
    example: 5000,
    description: '지출 비용',
  })
  expenses: number;

  @ApiProperty({
    example: '스타벅스 아이스아메리카노',
    description: '지출 비용에 대한 메모',
  })
  memo: string;
}
