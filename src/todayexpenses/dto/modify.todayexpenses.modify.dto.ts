import { ApiProperty } from '@nestjs/swagger';

export class ModifyTodayExpensesDto {
  @ApiProperty({
    example: 1,
    description: 'today_expenses.id',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'account_book_id foreignkey를 받아와서 접근합니다.',
  })
  accountBookId: number;

  @ApiProperty({
    example: 4000,
    description: '지출 비용입니다.',
  })
  expenses: number;

  @ApiProperty({
    example: '아이스크림',
    description: '지출 비용에 대한 메모입니다.',
  })
  memo: string;
}
