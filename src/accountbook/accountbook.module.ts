import { Module } from '@nestjs/common';
import { AccountbookService } from './accountbook.service';
import { AccountbookController } from './accountbook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { RefreshToken } from 'src/entities/RefreshToken';
import { TodayExpenses } from 'src/entities/TodayExpenses';
import { AccountBook } from 'src/entities/AccountBook';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken, TodayExpenses, AccountBook]),
  ],
  providers: [AccountbookService],
  controllers: [AccountbookController],
})
export class AccountbookModule {}
