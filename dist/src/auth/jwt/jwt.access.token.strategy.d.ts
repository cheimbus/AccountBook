import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/entities/Users';
import { jwtTokenPayload } from './jwt.token.payload';
import { Request } from 'express';
declare const JwtAccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessTokenStrategy extends JwtAccessTokenStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<Users>, configService: ConfigService);
    validate(req: Request, payload: jwtTokenPayload): Promise<Users>;
}
export {};
