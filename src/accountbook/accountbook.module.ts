import { Module } from '@nestjs/common';
import { AccountbookService } from './accountbook.service';
import { AccountbookController } from './accountbook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { RefreshToken } from 'src/entities/RefreshToken';
import { TodayExpenses } from 'src/entities/TodayExpenses';
import { AccountBook } from 'src/entities/AccountBook';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, RefreshToken, TodayExpenses, AccountBook]),
  ],
  providers: [AccountbookService],
  controllers: [AccountbookController],
})
export class AccountbookModule {}
