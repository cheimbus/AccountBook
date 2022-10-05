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
exports.AccountBookQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AccountBookQueryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '불러오고싶은 페이지를 입력합니다.',
    }),
    __metadata("design:type", Number)
], AccountBookQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: '몇개씩 가져올 지 입력합니다. 10을 입력하면 10개씩 가져옵니다.',
    }),
    __metadata("design:type", Number)
], AccountBookQueryDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'DESC',
        description: '내림차순인지 오름차순인지 작성합니다. DESC는 내림차순, ASC는 오름차순입니다.',
    }),
    __metadata("design:type", String)
], AccountBookQueryDto.prototype, "order", void 0);
exports.AccountBookQueryDto = AccountBookQueryDto;
//# sourceMappingURL=accountbook.query.dto.js.map