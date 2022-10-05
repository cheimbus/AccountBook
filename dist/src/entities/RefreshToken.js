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
exports.RefreshToken = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let RefreshToken = class RefreshToken {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'RefreshToken의 아이디',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], RefreshToken.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    (0, swagger_1.ApiProperty)({
        example: 'dfDSFEWekw#$199dAFS.fasfjdsfknDSF123.SDAFDSf3',
        description: '현재 RefreshToken',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'refresh_token',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], RefreshToken.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'created_at',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], RefreshToken.prototype, "createdAt", void 0);
RefreshToken = __decorate([
    (0, typeorm_1.Entity)()
], RefreshToken);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map