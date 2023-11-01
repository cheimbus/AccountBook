"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const ormconfig_1 = __importDefault(require("../../ormconfig"));
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const RefreshToken_1 = require("../entities/RefreshToken");
const AccountBook_1 = require("../entities/AccountBook");
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/ko");
const TodayExpenses_1 = require("../entities/TodayExpenses");
let UsersService = class UsersService {
    async createUser(email, nickname, password) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        const isUser = await queryRunner.manager
            .getRepository(User_1.User)
            .createQueryBuilder()
            .where('User.email=:email', { email })
            .getOne();
        if (isUser) {
            throw new common_1.UnauthorizedException('가입되어 있는 사용자입니다.');
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        try {
            dayjs_1.default.locale('ko');
            const refresh_token = new RefreshToken_1.RefreshToken();
            refresh_token.refreshToken = null;
            refresh_token.createdAt = (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm');
            await queryRunner.manager.save(refresh_token);
            const account_book = new AccountBook_1.AccountBook();
            await queryRunner.manager.save(account_book);
            const user = new User_1.User();
            user.email = email;
            user.nickname = nickname;
            user.password = hashedPassword;
            user.refreshTokenId = refresh_token;
            user.accountBookId = account_book;
            user.createdAt = (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm');
            const saveUser = await queryRunner.manager.getRepository(User_1.User).save(user);
            const { password } = saveUser, withoutPassword = __rest(saveUser, ["password"]);
            await queryRunner.commitTransaction();
            return {
                user: withoutPassword,
                createdAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH.mm'),
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async modifyUserInfo(id, email, nickname, password) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        try {
            dayjs_1.default.locale('ko');
            let hashedPassword;
            if (password) {
                hashedPassword = await bcrypt_1.default.hash(password, 12);
            }
            await queryRunner.manager.update(User_1.User, id, {
                email,
                nickname,
                password: hashedPassword,
                updatedAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm'),
            });
            await queryRunner.commitTransaction();
            return {
                message: '수정되었습니다!',
                updatedAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm'),
            };
        }
        catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteUserInfo(id) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        try {
            await queryRunner.manager
                .getRepository(TodayExpenses_1.TodayExpenses)
                .createQueryBuilder()
                .delete()
                .where('accountBookId=:account_book_id', { account_book_id: id })
                .execute();
            await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(User_1.User)
                .where('id=:id', { id })
                .execute();
            await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(AccountBook_1.AccountBook)
                .where('id=:id', { id })
                .execute();
            await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(RefreshToken_1.RefreshToken)
                .where('id=:id', { id })
                .execute();
            await queryRunner.commitTransaction();
            return { message: '삭제되었습니다!' };
        }
        catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map