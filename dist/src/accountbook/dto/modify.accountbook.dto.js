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
exports.ModifyAccountbookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ModifyAccountbookDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '돈안쓰는 시우의 가계부',
        description: '가계부 이름 수정합니다.',
    }),
    __metadata("design:type", String)
], ModifyAccountbookDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '티끌모아 태산이란걸 잊지말자',
        description: '가계부의 각오를 수정합니다.',
    }),
    __metadata("design:type", String)
], ModifyAccountbookDto.prototype, "determination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100000,
        description: '가계부의 투입금액을 수정합니다. 현재 투입금액과 중첩됩니다.',
    }),
    __metadata("design:type", Number)
], ModifyAccountbookDto.prototype, "inputMoney", void 0);
exports.ModifyAccountbookDto = ModifyAccountbookDto;
//# sourceMappingURL=modify.accountbook.dto.js.map