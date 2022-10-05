import { AccountBook } from './AccountBook';
export declare class TodayExpenses {
    id: number;
    expenses: number | null;
    memo: string | null;
    currnet_money: number | null;
    account_book_id: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    accountBookId: AccountBook;
}
