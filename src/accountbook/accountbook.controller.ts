import { Body, Controller, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt/jwt.access.token.auth.guard';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { UserIdDto } from 'src/user/dto/user.accountbookid.dto';
import { AccountbookService } from './accountbook.service';
import { AccountbookDto } from './dto/accountbook.dto';

@Controller('accountbook')
export class AccountbookController {
  constructor(private accountbookService: AccountbookService) {}

  // pagenation 적용해서 마지막으로 작성
  // @ApiOperation({ summary: '나의 가계 불러오기' })
  // @UseGuards(JwtAccessTokenAuthGuard)
  // @Get()
  // async getMyAccountBook(@CurrentUser() user): Promise<any> {
  //   return this.accountbookService.
  // }

  /**
   *
   * @param user jwtGuard로 현재 로그인한 user정보를 가져옴. 따라서 Param을 사용하지 않아도 접근가능
   * @param data 사용자가 입력한 값
   * @returns 중복오류나 잘못된 입력한 값 오류, 성공 시 생성멘트
   */
  @ApiOperation({ summary: '나의 가계부 생성' })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Post()
  async createMyAccountBook(
    @CurrentUser() user: UserIdDto,
    @Body() data: AccountbookDto,
  ): Promise<any> {
    await this.accountbookService.createAccountBook(
      user.id,
      data.name,
      data.determination,
      data.input_money,
    );
    return '가계부가 생성되었습니다!';
  }

  @ApiOperation({
    summary: '가계부 수정, current_money가 -인 경우는 적자가 난 경우라고 생각',
  })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Patch('edit')
  async modifyMyAccountBook(
    @CurrentUser() user: UserIdDto,
    @Body() data: AccountbookDto,
  ): Promise<any> {
    await this.accountbookService.modifyMyAccountBook(
      user.id,
      data.name,
      data.determination,
      data.input_money,
    );
    return '가계부가 수정되었습니다!';
  }

  @ApiOperation({
    summary: '가계부 삭제. soft delete하여 is_deleted를 true로 바꿈',
  })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Patch()
  async softDeleteMyAccountBook(@CurrentUser() user: UserIdDto): Promise<any> {
    await this.accountbookService.softDeleteMyAccountBook(user.id);
    return '삭제되었습니다!';
  }

  @ApiOperation({ summary: '삭제된 가계부 복구' })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Post('restore')
  async restoreMyAccountBook(@CurrentUser() user: UserIdDto): Promise<any> {
    return await this.accountbookService.restoreMyAccountBook(user.id);
  }
}
