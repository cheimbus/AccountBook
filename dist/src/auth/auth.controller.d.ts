import { LogInDto } from 'src/common/dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { UsersService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
export declare class AuthController {
    private readonly usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(userdata: CreateUserDto): Promise<any>;
    login(res: Response, data: LogInDto): Promise<any>;
    getAccessToken(res: Response, user: any): Promise<{
        accessToken: any;
        user: any;
    }>;
    logout(res: Response, user: any): Promise<void>;
}
