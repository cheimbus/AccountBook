/// <reference types="qs" />
import { UsersService } from './user.service';
import { Request } from 'express';
import { ModifyUserDto } from './dto/modify.user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(user: Request): Promise<Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>>;
    modifyUserInfo(user: any, body: ModifyUserDto): Promise<any>;
    deleteUserInfo(user: any): Promise<any>;
}
