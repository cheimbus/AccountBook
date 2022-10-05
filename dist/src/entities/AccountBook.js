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
exports.AccountBook = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const TodayExpenses_1 = require("./TodayExpenses");
let AccountBook = class AccountBook {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '가계부 아이디',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], AccountBook.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '절약짱 시우의 가계부',
        description: '가계부 이름',
        required: true,
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'name',
        length: 30,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], AccountBook.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '티끌모아 태산',
        description: '가계부에 대한 각오를 작성합니다',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'determination',
        length: 30,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], AccountBook.prototype, "determination", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: 30000,
        description: '전체 투입금액입니다. 가계부에서 사용금액의 대략적인 것을 정하는 과정입니다. 수정하여 투입금액을 높일 수 있습니다.',
    }),
    (0, typeorm_1.Column)({ type: 'int', name: 'input_money', default: 0 }),
    __metadata("design:type", Number)
], AccountBook.prototype, "input_money", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: 30000,
        description: '현재 가계부에서 남은 금액입니다. 지출을 할때마다 업데이트됩니다.',
    }),
    (0, typeorm_1.Column)({ type: 'int', name: 'current_money', default: 0 }),
    __metadata("design:type", Number)
], AccountBook.prototype, "current_money", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, swagger_1.ApiProperty)({
        example: 'true',
        description: 'soft delete를 하기위한 설정입니다. string형식으로 true, false를 작성하되, true는 삭제된 가계부이고 false는 삭제가 안된 가계부입니다. 가계부를 불러올 때 false인 가계부를 불러와야힙니다.',
    }),
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_deleted', default: false }),
    __metadata("design:type", Boolean)
], AccountBook.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'created_at',
        default: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], AccountBook.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'updated_at',
        default: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], AccountBook.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'deleted_at',
        default: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], AccountBook.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TodayExpenses_1.TodayExpenses, (todayExpenses) => todayExpenses.accountBookId),
    __metadata("design:type", TodayExpenses_1.TodayExpenses)
], AccountBook.prototype, "TodayExpenses", void 0);
AccountBook = __decorate([
    (0, typeorm_1.Entity)()
], AccountBook);
exports.AccountBook = AccountBook;
//# sourceMappingURL=AccountBook.js.map