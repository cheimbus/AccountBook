import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt/jwt.access.token.auth.guard';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { UserAccountBookIdDto } from 'src/user/dto/user.accountbookid.dto';
import { UserDto } from 'src/user/dto/user.dto';
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

  @ApiOperation({ summary: '나의 가계부 생성' })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Post()
  async createMyAccountBook(
    @CurrentUser() user: UserDto,
    @Body() data: AccountbookDto,
  ): Promise<any> {
    console.log(user.id);
    await this.accountbookService.createAccountBook(
      user.id,
      data.name,
      data.determination,
      data.input_money,
    );
    return '가계부가 생성되었습니다!';
  }

  // @ApiOperation({summary:'가계부 수정'})
  // @UseGuards(JwtAccessTokenAuthGuard)
  // @Patch()
  // async modifyMyAccountBook( @Body() data: AccountbookDto): Promise<any> {
  //   await
  // }
}
