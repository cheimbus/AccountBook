import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt/jwt.access.token.auth.guard';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { UserIdDto } from 'src/user/dto/user.accountbookid.dto';
import { AccountbookService } from './accountbook.service';
import { CreateAccountbookDto } from './dto/create.accountbook.dto';
import { AccountBookQueryDto } from './dto/accountbook.query.dto';
import { ModifyAccountbookDto } from './dto/modify.accountbook.dto';
import { AccountBookParamDto } from './dto/accountbook.param.dto';

@ApiTags('AccountBook')
@Controller('accountbook')
export class AccountbookController {
  constructor(private accountbookService: AccountbookService) {}

  @ApiOperation({
    summary: 'today-expenses로 생성된 나의 가계부를 불러옵니다.',
    description:
      'is_deleted가 false인 것만 가져오며 param에는 accountBookId가 입력됩니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get('/:accountbookid')
  async getMyAccountBook(
    @Param() param: AccountBookParamDto,
    @Query() query: AccountBookQueryDto,
    @CurrentUser() user: UserIdDto,
  ): Promise<any> {
    return this.accountbookService.getMyAccountBookList(
      query.page,
      query.take,
      query.order,
      param.accountbookid,
      user.id,
    );
  }

  /**
   *
   * @param user jwtGuard로 현재 로그인한 user정보를 가져옴. 따라서 Param을 사용하지 않아도 접근가능
   * @param data 사용자가 입력한 값
   * @returns 중복오류나 잘못된 입력한 값 오류, 성공 시 생성멘트
   */
  @ApiOperation({
    summary: '나의 가계부 생성',
    description:
      '가계부를 생성할 name, determination, input_money를 작성합니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Post()
  async createMyAccountBook(
    @CurrentUser() user: UserIdDto,
    @Body() data: CreateAccountbookDto,
  ): Promise<any> {
    return await this.accountbookService.createAccountBook(
      user.id,
      data.name,
      data.determination,
      data.input_money,
    );
  }

  @ApiOperation({
    summary: '가계부를 수정합니다.',
    description: '가계부를 수정합니다. 각각 수정할 수 있습니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Patch('edit')
  async modifyMyAccountBook(
    @CurrentUser() user: UserIdDto,
    @Body() data: ModifyAccountbookDto,
  ): Promise<any> {
    return await this.accountbookService.modifyMyAccountBook(
      user.id,
      data.name,
      data.determination,
      data.input_money,
    );
  }

  @ApiOperation({
    summary: '가계부를 삭제합니다.',
    description:
      'soft delete를 사용하기 때문에 is_deleted를 true로 변경합니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Patch()
  async softDeleteMyAccountBook(@CurrentUser() user: UserIdDto): Promise<any> {
    return await this.accountbookService.softDeleteMyAccountBook(user.id);
  }

  @ApiOperation({
    summary: '삭제된 가계부를 복구합니다',
    description: 'is_deleted를 false로 변경합니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Post('restore')
  async restoreMyAccountBook(@CurrentUser() user: UserIdDto): Promise<any> {
    return await this.accountbookService.restoreMyAccountBook(user.id);
  }
}
