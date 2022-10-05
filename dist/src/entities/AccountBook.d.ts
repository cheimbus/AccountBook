import { TodayExpenses } from './TodayExpenses';
export declare class AccountBook {
    id: number;
    name: string;
    determination: string;
    input_money: number;
    current_money: number;
    is_deleted: boolean;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    TodayExpenses: TodayExpenses;
}
