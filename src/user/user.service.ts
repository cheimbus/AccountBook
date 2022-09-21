import { Injectable, UnauthorizedException } from '@nestjs/common';
import dataSource from 'ormconfig';
import { Users } from 'src/entities/Users';
import bcrypt from 'bcrypt';
import { RefreshToken } from 'src/entities/RefreshToken';
import { AccountBook } from 'src/entities/AccountBook';

@Injectable()
export class UsersService {
  async createUser(email: string, nickname: string, password: string) {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const isUser = await queryRunner.manager
      .getRepository(Users)
      .createQueryBuilder()
      .where('Users.email=:email', { email })
      .getOne();

    if (isUser) {
      throw new UnauthorizedException('가입되어 있는 사용자입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const refresh_token = new RefreshToken();
      refresh_token.refresh_token = null;
      await queryRunner.manager.save(refresh_token);

      const account_book = new AccountBook();
      account_book.name = null;
      account_book.determiantion = null;
      account_book.input_money = null;
      account_book.current_money = null;
      account_book.is_deleted = null;
      await queryRunner.manager.save(account_book);

      const user = new Users();
      user.email = email;
      user.nickname = nickname;
      user.password = hashedPassword;
      user.refreshtoken = refresh_token;
      user.accountbook = account_book;

      const saveUser = await queryRunner.manager
        .getRepository(Users)
        .save(user);
      const { password, ...withoutPassword } = saveUser;
      await queryRunner.commitTransaction();
      return { user: withoutPassword };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
