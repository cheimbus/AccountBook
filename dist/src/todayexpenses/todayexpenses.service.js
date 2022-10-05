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
exports.TodayexpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = __importDefault(require("../../ormconfig"));
const auth_service_1 = require("../auth/auth.service");
const AccountBook_1 = require("../entities/AccountBook");
const TodayExpenses_1 = require("../entities/TodayExpenses");
const typeorm_2 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/ko");
let TodayexpensesService = class TodayexpensesService {
    constructor(todayExpensesRepository, accountBookRepository, authService) {
        this.todayExpensesRepository = todayExpensesRepository;
        this.accountBookRepository = accountBookRepository;
        this.authService = authService;
    }
    async CreateTodayExpenses(accountBookId, expenses, memo) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        if (expenses < 0) {
            throw new common_1.ForbiddenException('비용은 양수를 입력해야 합니다.');
        }
        try {
            const accountBook = await this.accountBookRepository.findOne({
                where: { id: accountBookId },
            });
            const accountBookCurrentMoney = accountBook.current_money;
            const currentMoney = accountBookCurrentMoney - expenses;
            await queryRunner.manager.update(AccountBook_1.AccountBook, accountBookId, {
                current_money: currentMoney,
            });
            const getAccountBookInfo = await queryRunner.manager
                .getRepository(AccountBook_1.AccountBook)
                .createQueryBuilder()
                .where('id=:id', { id: accountBookId })
                .getOne();
            dayjs_1.default.locale('ko');
            const todayExpenses = new TodayExpenses_1.TodayExpenses();
            todayExpenses.expenses = expenses;
            todayExpenses.memo = memo;
            todayExpenses.currnet_money = getAccountBookInfo.current_money;
            todayExpenses.createdAt = (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm');
            todayExpenses.account_book_id = accountBookId;
            const createTodayExpenses = await queryRunner.manager
                .getRepository(TodayExpenses_1.TodayExpenses)
                .save(todayExpenses);
            await queryRunner.commitTransaction();
            return {
                id: createTodayExpenses.id,
                message: '생성되었습니다! id값은 today_expenses의 id이므로 해당 expenses를 조회하거나 수정할 때 사용됩니다.',
                TodayExpenses: {
                    expenses,
                    createdAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm'),
                },
                CurrentMoney: getAccountBookInfo.current_money,
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
    async modifyTodayExpenses(id, accountBookId, expenses, memo) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        if (expenses < 0) {
            throw new common_1.ForbiddenException('비용은 양수를 입력해야 합니다.');
        }
        try {
            const accountBook = await this.accountBookRepository.findOne({
                where: { id: accountBookId },
            });
            const getTodayExpenses = await queryRunner.manager
                .getRepository(TodayExpenses_1.TodayExpenses)
                .createQueryBuilder('todayExpenses')
                .where('todayExpenses.id=:id', { id })
                .getOne();
            const accountBookCurrentMoney = accountBook.current_money;
            const currentMoney = accountBookCurrentMoney - expenses + getTodayExpenses.expenses;
            await queryRunner.manager.update(AccountBook_1.AccountBook, accountBookId, {
                current_money: currentMoney,
            });
            dayjs_1.default.locale('ko');
            await queryRunner.manager.update(TodayExpenses_1.TodayExpenses, getTodayExpenses.id, {
                expenses,
                memo,
                updatedAt: (0, dayjs_1.default)().format('YYYY.MM.DD dddd A HH:mm'),
            });
            await queryRunner.commitTransaction();
            return {
                message: '수정되었습니다!',
                updatedAt: (0, dayjs_1.default)().format('YYYYY.MM.DD dddd A HH:mm'),
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
    async getOneExpensesInfo(accountBookId, id, userId) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        const todayExpensesWithAccountBookId = await queryRunner.manager
            .getRepository(TodayExpenses_1.TodayExpenses)
            .createQueryBuilder('todayExpenses')
            .where('todayExpenses.account_book_id=:accountBookId', {
            accountBookId,
        })
            .andWhere('todayExpenses.id=:id', { id })
            .getOne();
        if (todayExpensesWithAccountBookId === null || userId !== accountBookId) {
            throw new common_1.ForbiddenException('권한이 없습니다.');
        }
        const getAccountBookInfo = await queryRunner.manager
            .getRepository(AccountBook_1.AccountBook)
            .createQueryBuilder()
            .where('id=:id', { id: userId })
            .getOne();
        try {
            const { account_book_id } = todayExpensesWithAccountBookId, withoutAccountBookId = __rest(todayExpensesWithAccountBookId, ["account_book_id"]);
            await queryRunner.commitTransaction();
            return {
                TodayExpenses: withoutAccountBookId,
                CurrentMoney: getAccountBookInfo.current_money,
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
    async deleteAccountBook(accountBookId, id, userId) {
        const queryRunner = ormconfig_1.default.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        const todayExpensesWithAccountBookId = await queryRunner.manager
            .getRepository(TodayExpenses_1.TodayExpenses)
            .createQueryBuilder()
            .where('account_book_id=:accountBookId', { accountBookId })
            .getOne();
        if (todayExpensesWithAccountBookId === null || accountBookId !== userId) {
            throw new common_1.ForbiddenException('권한이 없습니다.');
        }
        try {
            const getAllTodayExpenses = await queryRunner.manager
                .getRepository(TodayExpenses_1.TodayExpenses)
                .createQueryBuilder()
                .where('account_book_id=:account_book_id', {
                account_book_id: accountBookId,
            })
                .getManyAndCount();
            const arrayWithTodayExpensesId = [];
            for (let i = 0; i < getAllTodayExpenses[1]; i++) {
                arrayWithTodayExpensesId.push(getAllTodayExpenses[0][i].id);
            }
            const todayExpensesEqualId = await queryRunner.manager
                .getRepository(TodayExpenses_1.TodayExpenses)
                .createQueryBuilder()
                .where('id=:id', { id })
                .getOne();
            const currentExpenses = todayExpensesEqualId.expenses;
            for (let i = 0; i < arrayWithTodayExpensesId.length; i++) {
                const getId = arrayWithTodayExpensesId[i];
                const todayExpensesInfo = await queryRunner.manager
                    .getRepository(TodayExpenses_1.TodayExpenses)
                    .createQueryBuilder()
                    .where('id=:id', { id: getId })
                    .getOne();
                const currentMoneyAddExpenses = todayExpensesInfo.currnet_money + currentExpenses;
                await queryRunner.manager.update(TodayExpenses_1.TodayExpenses, getId, {
                    currnet_money: currentMoneyAddExpenses,
                });
            }
            const expensesInfo = await queryRunner.manager
                .getRepository(TodayExpenses_1.TodayExpenses)
                .createQueryBuilder()
                .where('id=:id', { id })
                .getOne();
            await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(TodayExpenses_1.TodayExpenses)
                .where('id=:id', { id })
                .execute();
            const getAccountBookInfo = await queryRunner.manager
                .getRepository(AccountBook_1.AccountBook)
                .createQueryBuilder()
                .where('id=:id', { id: accountBookId })
                .getOne();
            const currentMoneyAddExpenses = getAccountBookInfo.current_money + expensesInfo.expenses;
            await queryRunner.manager.update(AccountBook_1.AccountBook, accountBookId, {
                current_money: currentMoneyAddExpenses,
            });
            await queryRunner.commitTransaction();
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
TodayexpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(TodayExpenses_1.TodayExpenses)),
    __param(1, (0, typeorm_1.InjectRepository)(AccountBook_1.AccountBook)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        auth_service_1.AuthService])
], TodayexpensesService);
exports.TodayexpensesService = TodayexpensesService;
//# sourceMappingURL=todayexpenses.service.js.map