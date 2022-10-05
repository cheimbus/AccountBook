import 'dayjs/locale/ko';
export declare class UsersService {
    createUser(email: string, nickname: string, password: string): Promise<any>;
    modifyUserInfo(id: number, email: string, nickname: string, password: string): Promise<any>;
    deleteUserInfo(id: number): Promise<any>;
}
