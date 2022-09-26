import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'ormconfig';
import { AuthService } from 'src/auth/auth.service';
import { AccountBook } from 'src/entities/AccountBook';
import { TodayExpenses } from 'src/entities/TodayExpenses';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

@Injectable()
export class TodayexpensesService {
  constructor(
    @InjectRepository(TodayExpenses)
    private todayExpensesRepository: Repository<TodayExpenses>,
    @InjectRepository(AccountBook)
    private accountBookRepository: Repository<AccountBook>,
    private authService: AuthService,
  ) {}
  async CreateTodayExpenses(
    accountBookId: number,
    expenses: number,
    memo: string,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    if (expenses < 0) {
      throw new ForbiddenException('비용은 양수를 입력해야 합니다.');
    }
    try {
      /**
       * accountBookId가 JoinColumn으로 설정되어있기 때문에 타입목적으로 생성한 Column으로 account_book_id에 접근하면 에러가 남
       * today_expenses의 account_book_id에 설정되어있는 곳으로 이동하기 위해서는
       * const accountBookIdWithTodayExpenses =
        await this.todayExpensesRepository.findOne({
          where: { id },
          relations: { accountBookId: true },
        });
        이런식으로 접근한다. 조회할때는 account_book_id로 조회함 
       */
      const accountBook = await this.accountBookRepository.findOne({
        where: { id: accountBookId },
      });
      const accountBookCurrentMoney = accountBook.current_money;
      const currentMoney = accountBookCurrentMoney - expenses;
      await queryRunner.manager.update(AccountBook, accountBookId, {
        current_money: currentMoney,
      });
      dayjs.locale('ko');
      const todayExpenses = new TodayExpenses();
      todayExpenses.expenses = expenses;
      todayExpenses.memo = memo;
      todayExpenses.createdAt = dayjs().format('YYYY.MM.DD dddd A HH:mm');
      todayExpenses.account_book_id = accountBookId;
      const createTodayExpenses = await queryRunner.manager
        .getRepository(TodayExpenses)
        .save(todayExpenses);
      await queryRunner.commitTransaction();
      return {
        id: createTodayExpenses.id,
        message:
          '생성되었습니다! id값은 today_expenses의 id이므로 수정할 때 사용됩니다.',
        createdAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async modifyTodayExpenses(
    id: number,
    accountBookId: number,
    expenses: number,
    memo: string,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    if (expenses < 0) {
      throw new ForbiddenException('비용은 양수를 입력해야 합니다.');
    }
    try {
      const accountBook = await this.accountBookRepository.findOne({
        where: { id: accountBookId },
      });
      const getTodayExpenses = await queryRunner.manager
        .getRepository(TodayExpenses)
        .createQueryBuilder('todayExpenses')
        .where('todayExpenses.id=:id', { id })
        .getOne();
      const accountBookCurrentMoney = accountBook.current_money;
      const currentMoney =
        accountBookCurrentMoney - expenses + getTodayExpenses.expenses;
      await queryRunner.manager.update(AccountBook, accountBookId, {
        current_money: currentMoney,
      });
      dayjs.locale('ko');
      await queryRunner.manager.update(TodayExpenses, getTodayExpenses.id, {
        expenses,
        memo,
        updatedAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
      });

      await queryRunner.commitTransaction();
      return {
        message: '수정되었습니다!',
        updatedAt: dayjs().format('YYYYY.MM.DD dddd A HH:mm'),
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
