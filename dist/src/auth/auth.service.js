"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../entities/User");
const typeorm_2 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const RefreshToken_1 = require("../entities/RefreshToken");
let AuthService = class AuthService {
    constructor(userRepository, refreshTokenRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }
        const hashed = await bcrypt_1.default.compare(password, user.password);
        if (!hashed) {
            throw new common_1.UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }
        else {
            const { password } = user, withoutPassword = __rest(user, ["password"]);
            const payload = withoutPassword.email;
            const { accessToken, accessTokenCookieOption } = await this.getJwtAccessToken(payload);
            const { refreshToken, refreshTokenCookieOption } = await this.getJwtRefreshToken(payload);
            return {
                accessToken,
                accessTokenCookieOption,
                refreshToken,
                refreshTokenCookieOption,
            };
        }
    }
    async getUserId(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        const getUserId = user.id;
        return getUserId;
    }
    async getJwtAccessToken(email) {
        const payload = { email };
        const accessToken = this.jwtService.sign(payload);
        if (!accessToken) {
            throw new common_1.UnauthorizedException('유효하지 않은 페이로드입니다.');
        }
        const accessTokenCookieOption = {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60,
        };
        return { accessToken, accessTokenCookieOption };
    }
    async getJwtRefreshToken(email) {
        const payload = { email };
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRESIN'),
        });
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('유효하지 않은 페이로드입니다.');
        }
        const refreshTokenCookieOption = {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 12,
        };
        return { refreshToken, refreshTokenCookieOption };
    }
    async refreshTokenMatch(refreshToken, id) {
        const refreshTokenInfoEqualUserId = await this.refreshTokenRepository.findOne({ where: { id } });
        if (!refreshTokenInfoEqualUserId) {
            throw new common_1.UnauthorizedException('잘못된 접근입니다.');
        }
        const isMatched = await bcrypt_1.default.compare(refreshToken, refreshTokenInfoEqualUserId.refreshToken);
        if (!isMatched) {
            throw new common_1.UnauthorizedException('잘못된 접근입니다.');
        }
        const userInfo = await this.userRepository.findOne({ where: { id } });
        return userInfo;
    }
    async setRefreshToken(refreshToken, id) {
        const hashedRefreshToken = await bcrypt_1.default.hash(refreshToken, 12);
        await this.refreshTokenRepository.update({ id }, { refreshToken: hashedRefreshToken });
    }
    async refreshTokenToNull(id) {
        return await this.refreshTokenRepository.update({ id }, { refreshToken: null });
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
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(RefreshToken_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map