"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountbookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const AccountBook_1 = require("../../entities/AccountBook");
class CreateAccountbookDto extends (0, swagger_1.PickType)(AccountBook_1.AccountBook, [
    'name',
    'determination',
    'input_money',
]) {
}
exports.CreateAccountbookDto = CreateAccountbookDto;
//# sourceMappingURL=create.accountbook.dto.js.map