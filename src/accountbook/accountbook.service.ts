import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'ormconfig';
import { AccountBook } from 'src/entities/AccountBook';
import { TodayExpenses } from 'src/entities/TodayExpenses';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class AccountbookService {
  constructor(
    @InjectRepository(AccountBook)
    private accountbookRepository: Repository<AccountBook>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
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
    if (myAccountBook.name !== null) {
      throw new ForbiddenException('하나의 가계부만 생성가능합니다.');
    }
    if (input_money < 0) {
      throw new ForbiddenException('돈을 넣을 때는 양수만 입력 가능합니다.');
    }
    try {
      const currentMoney = myAccountBook.current_money;
      const addInputMoneyWithCurrentMoney = input_money + currentMoney;
      await queryRunner.manager.update(AccountBook, id, {
        name,
        determination,
        input_money,
        current_money: addInputMoneyWithCurrentMoney,
      });
      /**
       * foreinkey에 number,string등 타입이 들어가지않기 때문에 Column을 새로 생성해서 타입을 지정함
       */
      const todayExpenses = new TodayExpenses();
      todayExpenses.account_book_id =
        userInfoWithAccountbookId.accountbookId.id;
      const todayExpensesId = await queryRunner.manager.save(todayExpenses);
      await queryRunner.commitTransaction();
      /**
       * todayExpenses.id를 리턴하는 이유는 today_expenses에서 create할때 today_expenses.id를 가져오기 위함이다.
       * 따라서 요청할때 리턴받은 todayExpensesId.id를 body로 담아보내야한다.
       */
      return { message: '가계부가 생성되었습니다!', data: todayExpensesId.id };
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
      const currentMoney = myAccountBook.current_money;
      const addInputMoneyWithCurrentMoney = input_money + currentMoney;
      await queryRunner.manager.update(AccountBook, id, {
        name,
        determination,
        input_money,
        current_money: addInputMoneyWithCurrentMoney,
      });
      await queryRunner.commitTransaction();
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
      await queryRunner.manager.update(AccountBook, myAccountBook.id, {
        is_deleted: true,
      });
      await queryRunner.commitTransaction();
      return;
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
}
