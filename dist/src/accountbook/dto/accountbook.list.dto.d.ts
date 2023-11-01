import { AccountBook } from 'src/entities/AccountBook';
declare const AccountbookListDto_base: import("@nestjs/common").Type<Pick<AccountBook, "name" | "id" | "createdAt" | "determination" | "inputMoney" | "currentMoney">>;
export declare class AccountbookListDto extends AccountbookListDto_base {
}
export {};
