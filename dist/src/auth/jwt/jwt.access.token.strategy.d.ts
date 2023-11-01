import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/User';
import { jwtTokenPayload } from './jwt.token.payload';
import { Request } from 'express';
declare const JwtAccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessTokenStrategy extends JwtAccessTokenStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    validate(req: Request, payload: jwtTokenPayload): Promise<User>;
}
export {};
