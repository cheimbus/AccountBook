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
exports.TodayexpensesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_auth_guard_1 = require("../auth/jwt/jwt.access.token.auth.guard");
const user_request_decorator_1 = require("../common/decorators/user.request.decorator");
const positive_int_pipe_1 = require("../common/pipe/positive.int.pipe");
const user_accountbookid_dto_1 = require("../user/dto/user.accountbookid.dto");
const create_todayexpenses_dto_1 = require("./dto/create.todayexpenses.dto");
const modify_todayexpenses_modify_dto_1 = require("./dto/modify.todayexpenses.modify.dto");
const todayexpenses_service_1 = require("./todayexpenses.service");
let TodayexpensesController = class TodayexpensesController {
    constructor(todayExpensesService) {
        this.todayExpensesService = todayExpensesService;
    }
    async createTodayExpenses(data) {
        return this.todayExpensesService.CreateTodayExpenses(data.id, data.expenses, data.memo);
    }
    async modifyTodayExpenses(data) {
        return this.todayExpensesService.modifyTodayExpenses(data.id, data.accountBookId, data.expenses, data.memo);
    }
    async getOneExpensesInfo(accountbookid, id, user) {
        return this.todayExpensesService.getOneExpensesInfo(accountbookid, id, user.id);
    }
    async deleteOneExpenses(accountbookid, id, user) {
        return this.todayExpensesService.deleteAccountBook(accountbookid, id, user.id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '오늘 지출한 내역을 생성합니다.',
        description: 'id값은 todayExpenses.account_book_id 값입니다. account_book에 속하기 위함입니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todayexpenses_dto_1.CreateTodayExpensesDto]),
    __metadata("design:returntype", Promise)
], TodayexpensesController.prototype, "createTodayExpenses", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '오늘 지출한 내역을 수정합니다.',
        description: 'id값은 todayExpenses.account_book_id 값입니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modify_todayexpenses_modify_dto_1.ModifyTodayExpensesDto]),
    __metadata("design:returntype", Promise)
], TodayexpensesController.prototype, "modifyTodayExpenses", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '지출내용 불러오기',
        description: '원하는 지출내용을 불러옵니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Get)(':accountbookid/:id'),
    __param(0, (0, common_1.Param)('accountbookid', positive_int_pipe_1.PositivePipe)),
    __param(1, (0, common_1.Param)('id', positive_int_pipe_1.PositivePipe)),
    __param(2, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_accountbookid_dto_1.UserIdDto]),
    __metadata("design:returntype", Promise)
], TodayexpensesController.prototype, "getOneExpensesInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '지출내용 삭제하기',
        description: '원하는 지출내용을 삭제합니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, common_1.Delete)(':accountbookid/:id'),
    __param(0, (0, common_1.Param)('accountbookid', positive_int_pipe_1.PositivePipe)),
    __param(1, (0, common_1.Param)('id', positive_int_pipe_1.PositivePipe)),
    __param(2, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_accountbookid_dto_1.UserIdDto]),
    __metadata("design:returntype", Promise)
], TodayexpensesController.prototype, "deleteOneExpenses", null);
TodayexpensesController = __decorate([
    (0, swagger_1.ApiTags)('TodayExpenses'),
    (0, common_1.Controller)('today-expenses'),
    __metadata("design:paramtypes", [todayexpenses_service_1.TodayexpensesService])
], TodayexpensesController);
exports.TodayexpensesController = TodayexpensesController;
//# sourceMappingURL=todayexpenses.controller.js.map