import { Injectable, UnauthorizedException } from '@nestjs/common';
import dataSource from 'ormconfig';
import { Users } from 'src/entities/Users';
import bcrypt from 'bcrypt';
import { RefreshToken } from 'src/entities/RefreshToken';
import { AccountBook } from 'src/entities/AccountBook';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

@Injectable()
export class UsersService {
  async createUser(
    email: string,
    nickname: string,
    password: string,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const isUser = await queryRunner.manager
      .getRepository(Users)
      .createQueryBuilder()
      .where('Users.email=:email', { email })
      .getOne();
    /**
     * try 안에서 http메세지를 사용하면 httpexception이 제대로 안된다.
     * 따라서 http메세지를 처리할 경우 try를 사용할 때 한정해서 바깥에서 처리한다.
     **/
    if (isUser) {
      throw new UnauthorizedException('가입되어 있는 사용자입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      dayjs.locale('ko');
      const refresh_token = new RefreshToken();
      refresh_token.refresh_token = null;
      refresh_token.createdAt = dayjs().format('YYYY.MM.DD dddd A HH:mm');
      await queryRunner.manager.save(refresh_token);

      const account_book = new AccountBook();
      await queryRunner.manager.save(account_book);

      const user = new Users();
      user.email = email;
      user.nickname = nickname;
      user.password = hashedPassword;
      user.refreshtokenId = refresh_token;
      user.accountbookId = account_book;
      user.createdAt = dayjs().format('YYYY.MM.DD dddd A HH:mm');

      const saveUser = await queryRunner.manager
        .getRepository(Users)
        .save(user);
      const { password, ...withoutPassword } = saveUser;
      await queryRunner.commitTransaction();
      return {
        user: withoutPassword,
        createdAt: dayjs().format('YYYY.MM.DD dddd A HH.mm'),
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async modifyUserInfo(
    id: number,
    email: string,
    nickname: string,
    password: string,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      dayjs.locale('ko');
      const hashedPassword = await bcrypt.hash(password, 12);
      await queryRunner.manager.update(Users, id, {
        email,
        nickname,
        password: hashedPassword,
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
}
