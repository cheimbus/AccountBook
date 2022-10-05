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
exports.TodayExpenses = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const AccountBook_1 = require("./AccountBook");
let TodayExpenses = class TodayExpenses {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'TodayExpenses 아이디입니다.',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], TodayExpenses.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: 5000,
        description: '지출 금액입니다.',
    }),
    (0, typeorm_1.Column)({ type: 'int', name: 'expenses', nullable: true }),
    __metadata("design:type", Number)
], TodayExpenses.prototype, "expenses", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: '스타벅스 아메리카노',
        description: '지출한 내역 메모합니다.',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'memo', nullable: true }),
    __metadata("design:type", String)
], TodayExpenses.prototype, "memo", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: '스타벅스 아메리카노',
        description: '지출한 내역 메모합니다.',
    }),
    (0, typeorm_1.Column)({ type: 'int', name: 'current_money', nullable: true }),
    __metadata("design:type", Number)
], TodayExpenses.prototype, "currnet_money", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'account_book_id',
        nullable: true,
    }),
    __metadata("design:type", Number)
], TodayExpenses.prototype, "account_book_id", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'created_at',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], TodayExpenses.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'updated_at',
        nullable: true,
        default: null,
        select: false,
    }),
    __metadata("design:type", String)
], TodayExpenses.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AccountBook_1.AccountBook, (accountBook) => accountBook.TodayExpenses, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'account_book_id', referencedColumnName: 'id' }]),
    __metadata("design:type", AccountBook_1.AccountBook)
], TodayExpenses.prototype, "accountBookId", void 0);
TodayExpenses = __decorate([
    (0, typeorm_1.Entity)()
], TodayExpenses);
exports.TodayExpenses = TodayExpenses;
//# sourceMappingURL=TodayExpenses.js.map