import { AccountBook } from './AccountBook';
import { RefreshToken } from './RefreshToken';
export declare class User {
    id: number;
    email: string;
    nickname: string;
    password: string;
    createdAt: string | null;
    updatedAt: string | null;
    accountBookId: AccountBook;
    refreshTokenId: RefreshToken;
}
