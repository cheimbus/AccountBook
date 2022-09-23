import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'ormconfig';
import { AccountBook } from 'src/entities/AccountBook';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class AccountbookService {
  constructor(
    @InjectRepository(AccountBook)
    private accountbookRepository: Repository<AccountBook>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  //   async getMyAccountBook(id: number): Promise<any> {
  //       const accountbook = this.
  //   }

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
    /**
     * try 안에서 http메세지를 사용하면 httpexception이 제대로 안된다.
     * 따라서 http메세지를 처리할 경우 try를 사용할 때 한정해서 바깥에서 처리한다.
     **/
    if (input_money < 0) {
      throw new ForbiddenException('돈을 넣을 때는 양수만 입력 가능합니다.');
    }
    try {
      if (myAccountBook) {
        throw new ForbiddenException('가계부는 한 개만 생성할 수 있습니다.');
      }
      const currentMoney = myAccountBook.current_money;
      const addInputMoneyWithCurrentMoney = input_money + currentMoney;
      await queryRunner.manager.update(
        AccountBook,
        userInfoWithAccountbookId.accountbookId.id,
        {
          name,
          determination,
          input_money,
          current_money: addInputMoneyWithCurrentMoney,
        },
      );
      await queryRunner.commitTransaction();
      return myAccountBook;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException('가계부는 한 개만 생성할 수 있습니다.');
    } finally {
      await queryRunner.release();
    }
  }
}
