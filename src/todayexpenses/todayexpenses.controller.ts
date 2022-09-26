import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt/jwt.access.token.auth.guard';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { PositivePipe } from 'src/common/pipe/positive.int.pipe';
import { UserIdDto } from 'src/user/dto/user.accountbookid.dto';
import { TodayExpensesDto } from './dto/todayexpenses.dto';
import { TodayExpensesModifyDto } from './dto/todayexpenses.modify.dto';
import { AccountBookIdDto } from './dto/todayexpenses.param.dto';
import { TodayexpensesService } from './todayexpenses.service';

@Controller('today-expenses')
export class TodayexpensesController {
  constructor(
    private todayExpensesService: TodayexpensesService,
    private authService: AuthService,
  ) {}
  @ApiOperation({ summary: '오늘 지출한 내역 생성' })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Post()
  /**
   * body로 전달받은 account_book_id를 이용해서 today_expenses.account_book_id로 정의한다.
   */
  async createTodayExpenses(@Body() data: TodayExpensesDto): Promise<any> {
    return this.todayExpensesService.CreateTodayExpenses(
      data.id,
      data.expenses,
      data.memo,
    );
  }
  @ApiOperation({ summary: '오늘 지출한 내역 수정' })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Patch()
  async modifyTodayExpenses(
    @Body() data: TodayExpensesModifyDto,
  ): Promise<any> {
    return this.todayExpensesService.modifyTodayExpenses(
      data.id,
      data.accountBookId,
      data.expenses,
      data.memo,
    );
  }

  @ApiOperation({ summary: '지출내용 불러오기' })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get(':id')
  async getOneExpensesInfo(
    @Param('id', PositivePipe) id: number,
    @Body() accountBookId: AccountBookIdDto,
    @CurrentUser() user: UserIdDto,
  ): Promise<any> {
    return this.todayExpensesService.getOneExpensesInfo(
      id,
      accountBookId.accountBookId,
      user.id,
    );
  }
}
