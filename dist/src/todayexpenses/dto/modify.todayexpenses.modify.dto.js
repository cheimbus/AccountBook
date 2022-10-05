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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyTodayExpensesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ModifyTodayExpensesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'today_expenses.id',
    }),
    __metadata("design:type", Number)
], ModifyTodayExpensesDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'account_book_id foreignkey를 받아와서 접근합니다.',
    }),
    __metadata("design:type", Number)
], ModifyTodayExpensesDto.prototype, "accountBookId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4000,
        description: '지출 비용입니다.',
    }),
    __metadata("design:type", Number)
], ModifyTodayExpensesDto.prototype, "expenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '아이스크림',
        description: '지출 비용에 대한 메모입니다.',
    }),
    __metadata("design:type", String)
], ModifyTodayExpensesDto.prototype, "memo", void 0);
exports.ModifyTodayExpensesDto = ModifyTodayExpensesDto;
//# sourceMappingURL=modify.todayexpenses.modify.dto.js.map