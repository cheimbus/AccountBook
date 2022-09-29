import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogInDto } from 'src/common/dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/common/decorators/user.request.decorator';
import { Response } from 'express';
import { jwtRefreshTokenAuthGuard } from 'src/auth/jwt/jwt.refresh.token.auth.guard';
import { UsersService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}
  @ApiOperation({
    summary: '회원가입',
    description: 'email, nickname, password는 반드시 작성해야 합니다.',
  })
  @Post('signup')
  async create(@Body() userdata: CreateUserDto) {
    return await this.usersService.createUser(
      userdata.email,
      userdata.nickname,
      userdata.password,
    );
  }
  @ApiOperation({
    summary: '로그인',
    description: 'email, password를 가지고 로그인을 합니다.',
  })
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() data: LogInDto,
  ): Promise<any> {
    const getUserId = await this.authService.getUserId(data.email);
    const { accessToken, accessTokenCookieOption } =
      await this.authService.validateUser(data.email, data.password);
    const { refreshToken, refreshTokenCookieOption } =
      await this.authService.validateUser(data.email, data.password);
    await this.authService.setRefreshToken(refreshToken, getUserId);
    res.cookie('AccessToken', accessToken, accessTokenCookieOption);
    res.cookie('RefreshToken', refreshToken, refreshTokenCookieOption);
    return { accessToken, refreshToken };
  }

  @ApiOperation({
    summary: 'AccessToken을 새로 발급합니다.',
    description:
      '로그인할 때 발급된 RefreshToken을 이용해 AccessToken을 새로 발급받습니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(jwtRefreshTokenAuthGuard)
  @Post('refresh')
  async getAccessToken(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user,
  ) {
    const { accessToken, accessTokenCookieOption } =
      await this.authService.getJwtAccessToken(user.email);
    res.cookie('AccessToken', accessToken, accessTokenCookieOption);
    return { accessToken, user };
  }

  @ApiOperation({
    summary: '로그아웃',
    description: '유저를 로그아웃하여 기존에 있던 쿠키정보를 삭제합니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(jwtRefreshTokenAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response, @CurrentUser() user) {
    const { accessTokenCookieOption, refreshTokenCookieOption } =
      await this.authService.getCookieOptionsForLogOut();
    const getUserId = await this.authService.getUserId(user.email);
    await this.authService.refreshTokenToNull(getUserId);
    res.cookie('AccessToken', '', accessTokenCookieOption);
    res.cookie('RefreshToken', '', refreshTokenCookieOption);
  }
}
