import {
  Controller,
  Get,
  Body,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { Request } from 'express';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt/jwt.access.token.auth.guard';
import { ModifyUserDto } from './dto/modify.user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '유저 정보를 가져옵니다.',
    description: '로그인할 때 받은 AccessToken을 입력하여 정보를 가져옵니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get()
  async getUser(@CurrentUser() user: Request) {
    return user;
  }

  @ApiOperation({
    summary: '유저 정보를 수정합니다.',
    description:
      '수정할 email, nickname, password를 작성합니다. 한번 수정할 때 전부 수정해야하지 않고 각각 수정 가능합니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Patch('edit')
  async modifyUserInfo(@CurrentUser() user, @Body() body: ModifyUserDto) {
    return await this.usersService.modifyUserInfo(
      user.id,
      body.email,
      body.nickname,
      body.password,
    );
  }

  @ApiOperation({
    summary: '유저 정보를 삭제합니다.',
    description: 'AccessToken을 이용해서 해당 유저 정보를 hard delete 합니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenAuthGuard)
  @Delete()
  async deleteUserInfo(@CurrentUser() user) {
    return await this.usersService.deleteUserInfo(user.id);
  }
}
