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
exports.CreateTodayExpensesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateTodayExpensesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'TodayExpenses.account_book_id 입니다.',
    }),
    __metadata("design:type", Number)
], CreateTodayExpensesDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5000,
        description: '지출 비용입니다.',
    }),
    __metadata("design:type", Number)
], CreateTodayExpensesDto.prototype, "expenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '스타벅스 아메리카노',
        description: '지출 비용을 메모합니다.',
    }),
    __metadata("design:type", String)
], CreateTodayExpensesDto.prototype, "memo", void 0);
exports.CreateTodayExpensesDto = CreateTodayExpensesDto;
//# sourceMappingURL=create.todayexpenses.dto.js.map