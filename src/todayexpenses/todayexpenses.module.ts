import { forwardRef, Module } from '@nestjs/common';
import { TodayexpensesService } from './todayexpenses.service';
import { TodayexpensesController } from './todayexpenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { AccountBook } from 'src/entities/AccountBook';
import { TodayExpenses } from 'src/entities/TodayExpenses';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, AccountBook, TodayExpenses]),
    forwardRef(() => AuthModule),
  ],
  providers: [TodayexpensesService],
  controllers: [TodayexpensesController],
})
export class TodayexpensesModule {}
