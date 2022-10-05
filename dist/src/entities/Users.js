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
exports.Users = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const AccountBook_1 = require("./AccountBook");
const RefreshToken_1 = require("./RefreshToken");
let Users = class Users {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '사용자 아이디',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'siu@naver.com',
        description: '이메일',
        required: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'email', unique: true, length: 30 }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: '가계부하면시우',
        description: '닉네임',
        required: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'nickname', unique: true, length: 30 }),
    __metadata("design:type", String)
], Users.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'A$dawjdo123',
        description: '비밀번호',
        required: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'password', length: 200, select: false }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'created_at',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'updated_at',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => AccountBook_1.AccountBook),
    (0, typeorm_1.JoinColumn)([{ name: 'account_book_id', referencedColumnName: 'id' }]),
    __metadata("design:type", AccountBook_1.AccountBook)
], Users.prototype, "accountbookId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => RefreshToken_1.RefreshToken),
    (0, typeorm_1.JoinColumn)([{ name: 'refresh_token_id', referencedColumnName: 'id' }]),
    __metadata("design:type", RefreshToken_1.RefreshToken)
], Users.prototype, "refreshtokenId", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map