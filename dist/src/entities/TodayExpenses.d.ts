import { AccountBook } from './AccountBook';
export declare class TodayExpenses {
    id: number;
    expenses: number | null;
    memo: string | null;
    currnetMoney: number | null;
    accountBookId: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    AccountBookId: AccountBook;
}
