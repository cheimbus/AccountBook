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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("../common/dto/login.dto");
const auth_service_1 = require("./auth.service");
const user_request_decorator_1 = require("../common/decorators/user.request.decorator");
const jwt_refresh_token_auth_guard_1 = require("./jwt/jwt.refresh.token.auth.guard");
const user_service_1 = require("../user/user.service");
const create_user_dto_1 = require("../user/dto/create.user.dto");
let AuthController = class AuthController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async create(userdata) {
        return await this.usersService.createUser(userdata.email, userdata.nickname, userdata.password);
    }
    async login(res, data) {
        const getUserId = await this.authService.getUserId(data.email);
        const { accessToken, accessTokenCookieOption } = await this.authService.validateUser(data.email, data.password);
        const { refreshToken, refreshTokenCookieOption } = await this.authService.validateUser(data.email, data.password);
        await this.authService.setRefreshToken(refreshToken, getUserId);
        res.cookie('AccessToken', accessToken, accessTokenCookieOption);
        res.cookie('RefreshToken', refreshToken, refreshTokenCookieOption);
        return { accessToken, refreshToken };
    }
    async getAccessToken(res, user) {
        const { accessToken, accessTokenCookieOption } = await this.authService.getJwtAccessToken(user.email);
        res.cookie('AccessToken', accessToken, accessTokenCookieOption);
        return { accessToken, user };
    }
    async logout(res, user) {
        const { accessTokenCookieOption, refreshTokenCookieOption } = await this.authService.getCookieOptionsForLogOut();
        const getUserId = await this.authService.getUserId(user.email);
        await this.authService.refreshTokenToNull(getUserId);
        res.cookie('AccessToken', '', accessTokenCookieOption);
        res.cookie('RefreshToken', '', refreshTokenCookieOption);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '회원가입',
        description: 'email, nickname, password는 반드시 작성해야 합니다.',
    }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '로그인',
        description: 'email, password를 가지고 로그인을 합니다.',
    }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LogInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'AccessToken을 새로 발급합니다.',
        description: '로그인할 때 발급된 RefreshToken을 이용해 AccessToken을 새로 발급받습니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_refresh_token_auth_guard_1.jwtRefreshTokenAuthGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAccessToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '로그아웃',
        description: '유저를 로그아웃하여 기존에 있던 쿠키정보를 삭제합니다.',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_refresh_token_auth_guard_1.jwtRefreshTokenAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, user_request_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map