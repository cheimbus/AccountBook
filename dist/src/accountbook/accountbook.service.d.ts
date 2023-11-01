import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import 'dayjs/locale/ko';
export declare class AccountbookService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createAccountBook(id: number, name: string, determination: string, input_money: number): Promise<any>;
    modifyMyAccountBook(id: number, name: string, determination: string, input_money: number): Promise<any>;
    softDeleteMyAccountBook(id: number): Promise<any>;
    restoreMyAccountBook(id: number): Promise<any>;
    getMyAccountBookList(currentPage: any, take: any, order: any, accountBookId: any, userId: number): Promise<any>;
}
