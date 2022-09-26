import { PickType } from '@nestjs/swagger';
import { TodayExpenses } from 'src/entities/TodayExpenses';

export class TodayExpensesDto extends PickType(TodayExpenses, [
  'id',
  'expenses',
  'memo',
] as const) {}
