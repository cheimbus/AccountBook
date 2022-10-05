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
exports.ModifyUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ModifyUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'siujjang@gmail.com',
    }),
    __metadata("design:type", String)
], ModifyUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '시우는가계부',
    }),
    __metadata("design:type", String)
], ModifyUserDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123123good',
    }),
    __metadata("design:type", String)
], ModifyUserDto.prototype, "password", void 0);
exports.ModifyUserDto = ModifyUserDto;
//# sourceMappingURL=modify.user.dto.js.map