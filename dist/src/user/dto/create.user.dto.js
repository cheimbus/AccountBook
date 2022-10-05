"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const Users_1 = require("../../entities/Users");
class CreateUserDto extends (0, swagger_1.PickType)(Users_1.Users, [
    'email',
    'nickname',
    'password',
]) {
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create.user.dto.js.map