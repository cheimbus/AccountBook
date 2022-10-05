"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const user_request_decorator_1 = require("../common/decorators/user.request.decorator");
const jwt_access_token_auth_guard_1 = require("../auth/jwt/jwt.access.token.auth.guard");
const modify_user_dto_1 = require("./dto/modify.user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUser(user) {
        return user;
    }
    async modifyUserInfo(user, body) {
        return await this.usersService.modifyUserInfo(user.id, body.email, body.nickname, body.password);
    }
    async deleteUserInfo(user) {
        return await this.usersService.deleteUserInfo(user.id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '유저 정보를 가져옵니다.',
        description: '로그인할 때 받은 AccessToken을 입력하여 정보를 가져옵니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '유저 정보를 수정합니다.',
        description: '수정할 email, nickname, password를 작성합니다. 한번 수정할 때 전부 수정해야하지 않고 각각 수정 가능합니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Patch)('edit'),
    __param(0, (0, user_request_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, modify_user_dto_1.ModifyUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "modifyUserInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '유저 정보를 삭제합니다.',
        description: 'AccessToken을 이용해서 해당 유저 정보를 hard delete 합니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserInfo", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map