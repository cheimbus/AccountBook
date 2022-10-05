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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountbookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = __importDefault(require("../../ormconfig"));
const AccountBook_1 = require("../entities/AccountBook");
const Users_1 = require("../entities/Users");
const typeorm_2 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/ko");
const TodayExpenses_1 = require("../entities/TodayExpenses");
let AccountbookService = class AccountbookService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createAccountBook(id, name, determination, input_money) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        console.log(id, typeof id);
        const userInfoWithAccountbookId = await queryRunner.manager
            .getRepository(Users_1.Users)
            .findOne({
            where: { id },
            relations: { accountbookId: true },
        });
        const myAccountBook = await queryRunner.manager
            .getRepository(AccountBook_1.AccountBook)
            .createQueryBuilder('accountbook')
            .where('accountbook.id=:id', {
            id: userInfoWithAccountbookId.accountbookId.id,
        })
            .getOne();
        if (myAccountBook.name !== null) {
            throw new common_1.ForbiddenException('하나의 가계부만 생성가능합니다.');
        }
        if (input_money < 0) {
            throw new common_1.ForbiddenException('돈을 넣을 때는 양수만 입력 가능합니다.');
        }
        try {
            dayjs_1.default.locale('ko');
            const currentMoney = myAccountBook.current_money;
            const addInputMoneyWithCurrentMoney = input_money + currentMoney;
            await queryRunner.manager.update(AccountBook_1.AccountBook, id, {
                name,
                determination,
                input_money,
                current_money: addInputMoneyWithCurrentMoney,
                createdAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm'),
            });
            await queryRunner.commitTransaction();
            return {
                message: '가계부가 생성되었습니다!',
                data: {
                    id: myAccountBook.id,
                    createdAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm'),
                    message: 'id는 account_book foreignkey입니다. 이것을 이용하여 today_expenses를 생성할때 foreignkey를 정의합니다',
                },
            };
        }
        catch (err) {
            console.log(err);
            queryRunner.rollbackTransaction();
        }
        finally {
            queryRunner.release();
        }
    }
    async modifyMyAccountBook(id, name, determination, input_money) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        const userInfoWithAccountbookId = await this.userRepository.findOne({
            where: { id },
            relations: { accountbookId: true },
        });
        const myAccountBook = await queryRunner.manager
            .getRepository(AccountBook_1.AccountBook)
            .createQueryBuilder('accountbook')
            .where('accountbook.id=:id', {
            id: userInfoWithAccountbookId.accountbookId.id,
        })
            .getOne();
        try {
            dayjs_1.default.locale('ko');
            const inputMoney = myAccountBook.input_money + input_money;
            const currentMoney = myAccountBook.current_money;
            const addInputMoneyWithCurrentMoney = input_money + currentMoney;
            await queryRunner.manager.update(AccountBook_1.AccountBook, id, {
                name,
                determination,
                input_money: inputMoney,
                current_money: addInputMoneyWithCurrentMoney,
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
    async softDeleteMyAccountBook(id) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        const userInfoWithAccountbookId = await this.userRepository.findOne({
            where: { id },
            relations: { accountbookId: true },
        });
        const myAccountBook = await queryRunner.manager
            .getRepository(AccountBook_1.AccountBook)
            .createQueryBuilder('accountbook')
            .where('accountbook.id=:id', {
            id: userInfoWithAccountbookId.accountbookId.id,
        })
            .getOne();
        try {
            dayjs_1.default.locale('ko');
            await queryRunner.manager.update(AccountBook_1.AccountBook, myAccountBook.id, {
                is_deleted: true,
                deletedAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm'),
            });
            await queryRunner.commitTransaction();
            return {
                message: '삭제되었습니다!',
                deletedAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm'),
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
    async restoreMyAccountBook(id) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        const userInfoWithAccountbookId = await this.userRepository.findOne({
            where: { id },
            relations: { accountbookId: true },
        });
        const myAccountBook = await queryRunner.manager
            .getRepository(AccountBook_1.AccountBook)
            .createQueryBuilder('accountbook')
            .where('accountbook.id=:id', {
            id: userInfoWithAccountbookId.accountbookId.id,
        })
            .getOne();
        try {
            await queryRunner.manager.update(AccountBook_1.AccountBook, myAccountBook.id, {
                is_deleted: false,
            });
            const updated = await queryRunner.manager
                .getRepository(AccountBook_1.AccountBook)
                .createQueryBuilder('accountbook')
                .where('accountbook.id=:id', {
                id: userInfoWithAccountbookId.accountbookId.id,
            })
                .getOne();
            await queryRunner.commitTransaction();
            return { message: '복구되었습니다!', accountbook: updated };
        }
        catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async getMyAccountBookList(currentPage, take, order, accountBookId, userId) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        const IntAccountBook = parseInt(accountBookId);
        if (userId !== IntAccountBook) {
            throw new common_1.ForbiddenException('권한이 없습니다.');
        }
        const isAccountBook = await queryRunner.manager
            .getRepository(AccountBook_1.AccountBook)
            .createQueryBuilder('accountbook')
            .where('accountbook.id=:id', { id: userId })
            .andWhere('accountbook.is_deleted=:is_deleted', { is_deleted: false })
            .getOne();
        if (!isAccountBook) {
            throw new common_1.BadRequestException('접근할 수 없습니다.');
        }
        const IntCurrrentPage = parseInt(currentPage);
        const IntTake = parseInt(take);
        const getTodayExpenses = await queryRunner.manager
            .getRepository(TodayExpenses_1.TodayExpenses)
            .createQueryBuilder('expenses')
            .orderBy('id', order)
            .skip((IntCurrrentPage - 1) * IntTake)
            .take(IntTake)
            .where('expenses.account_book_id=:accountBookId', { accountBookId })
            .getManyAndCount();
        const getCountItem = getTodayExpenses[1];
        const pageCount = Math.ceil(getCountItem / IntTake);
        const hasPreviousPage = IntCurrrentPage > 1;
        const hasNextPage = IntCurrrentPage < pageCount;
        if (currentPage > pageCount) {
            throw new common_1.ForbiddenException('접근할 수 없습니다.');
        }
        try {
            await queryRunner.commitTransaction();
            return {
                option: {
                    countItem: getCountItem,
                    take: IntTake,
                    currentPage: IntCurrrentPage,
                    pageCount,
                    hasPreviousPage,
                    hasNextPage,
                },
                data: getTodayExpenses[0],
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
};
AccountbookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(AccountBook_1.AccountBook)),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountbookService);
exports.AccountbookService = AccountbookService;
//# sourceMappingURL=accountbook.service.js.map