"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const User_1 = require("../../entities/User");
class UserDto extends (0, swagger_1.PickType)(User_1.User, [
    'id',
    'email',
    'password',
]) {
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map