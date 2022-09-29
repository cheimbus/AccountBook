import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'ormconfig';
import { AccountBook } from 'src/entities/AccountBook';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { TodayExpenses } from 'src/entities/TodayExpenses';

@Injectable()
export class AccountbookService {
  constructor(
    @InjectRepository(AccountBook)
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createAccountBook(
    id: number,
    name: string,
    determination: string,
    input_money: number,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    console.log(id, typeof id);
    const userInfoWithAccountbookId = await queryRunner.manager
      .getRepository(Users)
      .findOne({
        where: { id },
        relations: { accountbookId: true },
      });
    const myAccountBook = await queryRunner.manager
      .getRepository(AccountBook)
      .createQueryBuilder('accountbook')
      .where('accountbook.id=:id', {
        id: userInfoWithAccountbookId.accountbookId.id,
      })
      .getOne();
    if (myAccountBook.name !== null) {
      throw new ForbiddenException('하나의 가계부만 생성가능합니다.');
    }
    if (input_money < 0) {
      throw new ForbiddenException('돈을 넣을 때는 양수만 입력 가능합니다.');
    }
    try {
      dayjs.locale('ko');
      const currentMoney = myAccountBook.current_money;
      const addInputMoneyWithCurrentMoney = input_money + currentMoney;
      await queryRunner.manager.update(AccountBook, id, {
        name,
        determination,
        input_money,
        current_money: addInputMoneyWithCurrentMoney,
        createdAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
      });
      await queryRunner.commitTransaction();
      /**
       * todayExpenses.id를 리턴하는 이유는 today_expenses에서 create할때 today_expenses.id를 가져오기 위함이다.
       * 따라서 요청할때 리턴받은 todayExpensesId.id를 body로 담아보내야한다.
       */
      return {
        message: '가계부가 생성되었습니다!',
        data: {
          id: myAccountBook.id,
          createdAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
          message:
            'id는 account_book foreignkey입니다. 이것을 이용하여 today_expenses를 생성할때 foreignkey를 정의합니다',
        },
      };
    } catch (err) {
      console.log(err);
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async modifyMyAccountBook(
    id: number,
    name: string,
    determination: string,
    input_money: number,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const userInfoWithAccountbookId = await this.userRepository.findOne({
      where: { id },
      relations: { accountbookId: true },
    });
    const myAccountBook = await queryRunner.manager
      .getRepository(AccountBook)
      .createQueryBuilder('accountbook')
      .where('accountbook.id=:id', {
        id: userInfoWithAccountbookId.accountbookId.id,
      })
      .getOne();
    try {
      dayjs.locale('ko');
      const inputMoney = myAccountBook.input_money + input_money;
      const currentMoney = myAccountBook.current_money;
      const addInputMoneyWithCurrentMoney = input_money + currentMoney;
      await queryRunner.manager.update(AccountBook, id, {
        name,
        determination,
        input_money: inputMoney,
        current_money: addInputMoneyWithCurrentMoney,
        updatedAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
      });
      await queryRunner.commitTransaction();
      return {
        message: '수정되었습니다!',
        updatedAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async softDeleteMyAccountBook(id: number): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const userInfoWithAccountbookId = await this.userRepository.findOne({
      where: { id },
      relations: { accountbookId: true },
    });
    const myAccountBook = await queryRunner.manager
      .getRepository(AccountBook)
      .createQueryBuilder('accountbook')
      .where('accountbook.id=:id', {
        id: userInfoWithAccountbookId.accountbookId.id,
      })
      .getOne();
    try {
      dayjs.locale('ko');
      await queryRunner.manager.update(AccountBook, myAccountBook.id, {
        is_deleted: true,
        deletedAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
      });
      await queryRunner.commitTransaction();
      return {
        message: '삭제되었습니다!',
        deletedAt: dayjs().format('YYYY.MM.DD dddd A HH:mm'),
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async restoreMyAccountBook(id: number): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const userInfoWithAccountbookId = await this.userRepository.findOne({
      where: { id },
      relations: { accountbookId: true },
    });
    const myAccountBook = await queryRunner.manager
      .getRepository(AccountBook)
      .createQueryBuilder('accountbook')
      .where('accountbook.id=:id', {
        id: userInfoWithAccountbookId.accountbookId.id,
      })
      .getOne();
    try {
      await queryRunner.manager.update(AccountBook, myAccountBook.id, {
        is_deleted: false,
      });
      const updated = await queryRunner.manager
        .getRepository(AccountBook)
        .createQueryBuilder('accountbook')
        .where('accountbook.id=:id', {
          id: userInfoWithAccountbookId.accountbookId.id,
        })
        .getOne();
      await queryRunner.commitTransaction();
      return { message: '복구되었습니다!', accountbook: updated };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getMyAccountBookList(
    currentPage,
    take,
    order,
    accountBookId,
    userId: number,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const IntAccountBook = parseInt(accountBookId);
    if (userId !== IntAccountBook) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    const isAccountBook = await queryRunner.manager
      .getRepository(AccountBook)
      .createQueryBuilder('accountbook')
      .where('accountbook.id=:id', { id: userId })
      .andWhere('accountbook.is_deleted=:is_deleted', { is_deleted: false })
      .getOne();
    if (!isAccountBook) {
      throw new BadRequestException('접근할 수 없습니다.');
    }
    const IntCurrrentPage = parseInt(currentPage);
    const IntTake = parseInt(take);
    const getTodayExpenses = await queryRunner.manager
      .getRepository(TodayExpenses)
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
      throw new ForbiddenException('접근할 수 없습니다.');
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
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
