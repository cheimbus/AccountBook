"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const User_1 = require("../../entities/User");
class CreateUserDto extends (0, swagger_1.PickType)(User_1.User, [
    'email',
    'nickname',
    'password',
]) {
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create.user.dto.js.map