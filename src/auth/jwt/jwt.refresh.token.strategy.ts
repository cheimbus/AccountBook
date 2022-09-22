import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { Users } from 'src/entities/Users';
import { jwtTokenPayload } from './jwt.token.payload';
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwtRefreshTokenAuthGuard',
) {
  constructor(
    @InjectRepository(Users) private catsRepository: Repository<Users>,
    // super안에서 configService를 호출하기 위해서는 private을 제거한 후 호출 할 수 있음
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(@Req() req: Request, payload: jwtTokenPayload) {
    const refreshToken = req.headers.authorization.replace('Bearer ', '');
    const userId = await this.authService.getUserId(payload.email);
    return await this.authService.refreshTokenMatch(refreshToken, userId);
  }
}
