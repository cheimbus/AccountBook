import { Injectable, UnauthorizedException } from '@nestjs/common';
import dataSource from 'ormconfig';
import { Users } from 'src/entities/Users';
import bcrypt from 'bcrypt';

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
      const user = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      const { password, ...withoutPassword } = user;
      await queryRunner.commitTransaction();
      return { user: withoutPassword };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
