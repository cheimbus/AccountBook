import { AccountBook } from 'src/entities/AccountBook';
declare const AccountbookListDto_base: import("@nestjs/common").Type<Pick<AccountBook, "name" | "id" | "current_money" | "createdAt" | "determination" | "input_money">>;
export declare class AccountbookListDto extends AccountbookListDto_base {
}
export {};
