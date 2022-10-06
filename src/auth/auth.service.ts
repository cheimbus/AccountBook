import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { RefreshToken } from 'src/entities/RefreshToken';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }
    const hashed = await bcrypt.compare(password, user.password);
    if (!hashed) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    } else {
      const { password, ...withoutPassword } = user;
      const payload = withoutPassword.email;
      const { accessToken, accessTokenCookieOption } =
        await this.getJwtAccessToken(payload);

      const { refreshToken, refreshTokenCookieOption } =
        await this.getJwtRefreshToken(payload);
      return {
        accessToken,
        accessTokenCookieOption,
        refreshToken,
        refreshTokenCookieOption,
      };
    }
  }

  async getUserId(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    const getUserId = user.id;
    return getUserId;
  }

  async getJwtAccessToken(email: string): Promise<any> {
    const payload = { email };
    const accessToken = this.jwtService.sign(payload);
    if (!accessToken) {
      throw new UnauthorizedException('유효하지 않은 페이로드입니다.');
    }
    const accessTokenCookieOption = {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60,
    };
    return { accessToken, accessTokenCookieOption };
  }

  async getJwtRefreshToken(email: string): Promise<any> {
    const payload = { email };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });
    if (!refreshToken) {
      throw new UnauthorizedException('유효하지 않은 페이로드입니다.');
    }
    const refreshTokenCookieOption = {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 12,
    };
    return { refreshToken, refreshTokenCookieOption };
  }

  async refreshTokenMatch(refreshToken: string, id: number): Promise<any> {
    const refreshTokenInfoEqualUserId =
      await this.refreshTokenRepository.findOne({ where: { id } });
    if (!refreshTokenInfoEqualUserId) {
      throw new UnauthorizedException('잘못된 접근입니다.');
    }
    const isMatched = await bcrypt.compare(
      refreshToken,
      refreshTokenInfoEqualUserId.refreshToken,
    );
    if (!isMatched) {
      throw new UnauthorizedException('잘못된 접근입니다.');
    }
    const userInfo = await this.userRepository.findOne({ where: { id } });
    return userInfo;
  }

  async setRefreshToken(refreshToken: string, id: number) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    await this.refreshTokenRepository.update(
      { id },
      { refreshToken: hashedRefreshToken },
    );
  }

  async refreshTokenToNull(id: number) {
    return await this.refreshTokenRepository.update(
      { id },
      { refreshToken: null },
    );
  }

  async getCookieOptionsForLogOut() {
    return {
      accessTokenCookieOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshTokenCookieOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
