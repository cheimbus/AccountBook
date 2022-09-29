import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt/jwt.access.token.auth.guard';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { PositivePipe } from 'src/common/pipe/positive.int.pipe';
import { UserIdDto } from 'src/user/dto/user.accountbookid.dto';
import { CreateTodayExpensesDto } from './dto/create.todayexpenses.dto';
import { ModifyTodayExpensesDto } from './dto/modify.todayexpenses.modify.dto';
import { TodayExpensesParamDto } from './dto/todayexpenses.param.dto';
import { TodayexpensesService } from './todayexpenses.service';

@ApiTags('TodayExpenses')
@Controller('today-expenses')
export class TodayexpensesController {
  constructor(private todayExpensesService: TodayexpensesService) {}
  @ApiOperation({
    summary: '오늘 지출한 내역을 생성합니다.',
    description:
      'id값은 todayExpenses.account_book_id 값입니다. account_book에 속하기 위함입니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Post()
  /**
   * body로 전달받은 account_book_id를 이용해서 today_expenses.account_book_id로 정의한다.
   */
  async createTodayExpenses(
    @Body() data: CreateTodayExpensesDto,
  ): Promise<any> {
    return this.todayExpensesService.CreateTodayExpenses(
      data.id,
      data.expenses,
      data.memo,
    );
  }
  @ApiOperation({
    summary: '오늘 지출한 내역을 수정합니다.',
    description: 'id값은 todayExpenses.account_book_id 값입니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Patch()
  async modifyTodayExpenses(
    @Body() data: ModifyTodayExpensesDto,
  ): Promise<any> {
    return this.todayExpensesService.modifyTodayExpenses(
      data.id,
      data.accountBookId,
      data.expenses,
      data.memo,
    );
  }

  @ApiOperation({
    summary: '지출내용 불러오기',
    description: '원하는 지출내용을 불러옵니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get(':accountbookid/:id')
  async getOneExpensesInfo(
    @Param(PositivePipe) param: TodayExpensesParamDto,
    @CurrentUser() user: UserIdDto,
  ): Promise<any> {
    return this.todayExpensesService.getOneExpensesInfo(
      param.accountbookid,
      param.id,
      user.id,
    );
  }
}
