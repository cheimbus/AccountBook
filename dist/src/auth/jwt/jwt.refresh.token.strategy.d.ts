import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { Users } from 'src/entities/Users';
import { jwtTokenPayload } from './jwt.token.payload';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private catsRepository;
    private authService;
    constructor(catsRepository: Repository<Users>, configService: ConfigService, authService: AuthService);
    validate(req: Request, payload: jwtTokenPayload): Promise<any>;
}
export {};
