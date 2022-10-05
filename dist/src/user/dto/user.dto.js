"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const Users_1 = require("../../entities/Users");
class UserDto extends (0, swagger_1.PickType)(Users_1.Users, [
    'id',
    'email',
    'password',
]) {
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map