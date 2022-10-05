import { AccountBook } from './AccountBook';
import { RefreshToken } from './RefreshToken';
export declare class Users {
    id: number;
    email: string;
    nickname: string;
    password: string;
    createdAt: string | null;
    updatedAt: string | null;
    accountbookId: AccountBook;
    refreshtokenId: RefreshToken;
}
