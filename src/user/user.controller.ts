import { Controller, Get, Body, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { Request } from 'express';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt/jwt.access.token.auth.guard';
import { ModifyUserDto } from './dto/modify.user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: '유저 정보 가져옴' })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get()
  async getUser(@CurrentUser() user: Request) {
    console.log(user);
    return user;
  }

  @ApiOperation({
    summary:
      '유저 정보 수정. 수정을 할때는 처음 유저 정보를 가져갔을 때 유저가 현재 email, nickname, password정보를 가지고 있는 상태에서 수정할 수 있게 해야함',
  })
  @UseGuards(JwtAccessTokenAuthGuard)
  @Patch('edit')
  async modifyUserInfo(@CurrentUser() user, @Body() body: ModifyUserDto) {
    await this.usersService.modifyUserInfo(
      user.id,
      body.email,
      body.nickname,
      body.password,
    );
    return '수정되었습니다!';
  }
}
