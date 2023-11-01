import { TodayExpenses } from './TodayExpenses';
export declare class AccountBook {
    id: number;
    name: string;
    determination: string;
    inputMoney: number;
    currentMoney: number;
    isDeleted: boolean;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    todayExpenses: TodayExpenses;
}
