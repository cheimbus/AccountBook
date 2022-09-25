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
    id: number,
    expensesId: number,
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
       * const todayExpensesWithAccountBookId =
        await this.todayExpensesRepository.findOne({
          where: { id },
          relations: { accountBookId: true },
        });
        이런식으로 접근한다. 조회할때는 account_book_id로 조회함 
       */

      const todayExpensesWithAccountBookId =
        await this.todayExpensesRepository.findOne({
          where: { id },
        });
      console.log(todayExpensesWithAccountBookId.account_book_id);
      const accountBook = await this.accountBookRepository.findOne({
        where: { id: todayExpensesWithAccountBookId.account_book_id },
      });
      const accountBookCurrentMoney = accountBook.current_money;
      const currentMoney = accountBookCurrentMoney - expenses;
      await queryRunner.manager.update(AccountBook, id, {
        current_money: currentMoney,
      });
      const todayExpensesInfo = await this.todayExpensesRepository.findOne({
        where: { id: expensesId },
      });
      dayjs.locale('ko');
      await queryRunner.manager.update(TodayExpenses, todayExpensesInfo.id, {
        expenses,
        memo,
      });
      await queryRunner.commitTransaction();
      return {
        message: '생성되었습니다',
        createdAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
