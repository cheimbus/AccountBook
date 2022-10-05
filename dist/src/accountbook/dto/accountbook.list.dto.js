"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountbookListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const AccountBook_1 = require("../../entities/AccountBook");
class AccountbookListDto extends (0, swagger_1.PickType)(AccountBook_1.AccountBook, [
    'id',
    'input_money',
    'name',
    'determination',
    'current_money',
    'createdAt',
]) {
}
exports.AccountbookListDto = AccountbookListDto;
//# sourceMappingURL=accountbook.list.dto.js.map