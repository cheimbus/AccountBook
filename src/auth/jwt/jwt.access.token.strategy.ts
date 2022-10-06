import { ExtractJwt, Strategy } from 'passport-jwt';
// passport-local 에서 Strategy를 가져오면 인증을 제대로 할 수 없음
// passport-jwt에서 가져와야 함
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/User';
import { jwtTokenPayload } from './jwt.token.payload';
import { Request } from 'express';
@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'JwtAccessTokenAuthGuard',
) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(@Req() req: Request, payload: jwtTokenPayload) {
    // req를 해줘야 제대로된 토큰이 복호화된 값을 가져옴 req 데코레이터를 가져오지 않으니까
    // 계속 id : 1 인 email값만 가져옴
    const findCatByEmailWithoutPassword = await this.userRepository.findOne({
      where: { email: payload.email },
    });
    if (!findCatByEmailWithoutPassword) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    return findCatByEmailWithoutPassword;
  }
}
