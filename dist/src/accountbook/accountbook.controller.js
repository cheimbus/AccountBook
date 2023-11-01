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
exports.AccountbookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_auth_guard_1 = require("../auth/jwt/jwt.access.token.auth.guard");
const user_request_decorator_1 = require("../common/decorators/user.request.decorator");
const user_accountbookid_dto_1 = require("../user/dto/user.accountbookid.dto");
const accountbook_service_1 = require("./accountbook.service");
const create_accountbook_dto_1 = require("./dto/create.accountbook.dto");
const accountbook_query_dto_1 = require("./dto/accountbook.query.dto");
const modify_accountbook_dto_1 = require("./dto/modify.accountbook.dto");
const accountbook_param_dto_1 = require("./dto/accountbook.param.dto");
let AccountbookController = class AccountbookController {
    constructor(accountbookService) {
        this.accountbookService = accountbookService;
    }
    async getMyAccountBook(param, query, user) {
        return this.accountbookService.getMyAccountBookList(query.page, query.take, query.order, param.accountbookid, user.id);
    }
    async createMyAccountBook(user, data) {
        return await this.accountbookService.createAccountBook(user.id, data.name, data.determination, data.inputMoney);
    }
    async modifyMyAccountBook(user, data) {
        return await this.accountbookService.modifyMyAccountBook(user.id, data.name, data.determination, data.inputMoney);
    }
    async softDeleteMyAccountBook(user) {
        return await this.accountbookService.softDeleteMyAccountBook(user.id);
    }
    async restoreMyAccountBook(user) {
        return await this.accountbookService.restoreMyAccountBook(user.id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'today-expenses로 생성된 나의 가계부를 불러옵니다.',
        description: 'is_deleted가 false인 것만 가져오며 param에는 accountBookId가 입력됩니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Get)('/:accountbookid'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accountbook_param_dto_1.AccountBookParamDto,
        accountbook_query_dto_1.AccountBookQueryDto,
        user_accountbookid_dto_1.UserIdDto]),
    __metadata("design:returntype", Promise)
], AccountbookController.prototype, "getMyAccountBook", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '나의 가계부 생성',
        description: '가계부를 생성할 name, determination, inputMoney를 작성합니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_request_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_accountbookid_dto_1.UserIdDto,
        create_accountbook_dto_1.CreateAccountbookDto]),
    __metadata("design:returntype", Promise)
], AccountbookController.prototype, "createMyAccountBook", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '가계부를 수정합니다.',
        description: '가계부를 수정합니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Patch)('edit'),
    __param(0, (0, user_request_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_accountbookid_dto_1.UserIdDto,
        modify_accountbook_dto_1.ModifyAccountbookDto]),
    __metadata("design:returntype", Promise)
], AccountbookController.prototype, "modifyMyAccountBook", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '가계부를 삭제합니다.',
        description: 'soft delete를 사용하기 때문에 is_deleted를 true로 변경합니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Patch)(),
    __param(0, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_accountbookid_dto_1.UserIdDto]),
    __metadata("design:returntype", Promise)
], AccountbookController.prototype, "softDeleteMyAccountBook", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '삭제된 가계부를 복구합니다',
        description: 'isDeleted를 false로 변경합니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Post)('restore'),
    __param(0, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_accountbookid_dto_1.UserIdDto]),
    __metadata("design:returntype", Promise)
], AccountbookController.prototype, "restoreMyAccountBook", null);
AccountbookController = __decorate([
    (0, swagger_1.ApiTags)('AccountBook'),
    (0, common_1.Controller)('accountbook'),
    __metadata("design:paramtypes", [accountbook_service_1.AccountbookService])
], AccountbookController);
exports.AccountbookController = AccountbookController;
//# sourceMappingURL=accountbook.controller.js.map