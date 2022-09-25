import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt/jwt.access.token.auth.guard';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { UserDto } from 'src/user/dto/user.dto';
import { TodayExpensesDto } from './dto/todayexpenses.dto';
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
   * 바디로 전달받은 expenses.id를 이용해서 expenses.id에 접근한다음 생성한다.
   */
  async createTodayExpenses(
    @CurrentUser() user: UserDto,
    @Body() data: TodayExpensesDto,
  ): Promise<any> {
    return this.todayExpensesService.CreateTodayExpenses(
      user.id,
      data.id,
      data.expenses,
      data.memo,
    );
  }
}
