import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/entities/RefreshToken';
export declare class AuthService {
    private userRepository;
    private refreshTokenRepository;
    private jwtService;
    private configService;
    constructor(userRepository: Repository<Users>, refreshTokenRepository: Repository<RefreshToken>, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<any>;
    getUserId(email: string): Promise<number>;
    getJwtAccessToken(email: string): Promise<any>;
    getJwtRefreshToken(email: string): Promise<any>;
    refreshTokenMatch(refreshToken: string, id: number): Promise<any>;
    setRefreshToken(refreshToken: string, id: number): Promise<void>;
    refreshTokenToNull(id: number): Promise<import("typeorm").UpdateResult>;
    getCookieOptionsForLogOut(): Promise<{
        accessTokenCookieOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
        refreshTokenCookieOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
    }>;
}
