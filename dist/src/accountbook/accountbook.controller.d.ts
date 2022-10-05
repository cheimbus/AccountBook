import { UserIdDto } from 'src/user/dto/user.accountbookid.dto';
import { AccountbookService } from './accountbook.service';
import { CreateAccountbookDto } from './dto/create.accountbook.dto';
import { AccountBookQueryDto } from './dto/accountbook.query.dto';
import { ModifyAccountbookDto } from './dto/modify.accountbook.dto';
import { AccountBookParamDto } from './dto/accountbook.param.dto';
export declare class AccountbookController {
    private accountbookService;
    constructor(accountbookService: AccountbookService);
    getMyAccountBook(param: AccountBookParamDto, query: AccountBookQueryDto, user: UserIdDto): Promise<any>;
    createMyAccountBook(user: UserIdDto, data: CreateAccountbookDto): Promise<any>;
    modifyMyAccountBook(user: UserIdDto, data: ModifyAccountbookDto): Promise<any>;
    softDeleteMyAccountBook(user: UserIdDto): Promise<any>;
    restoreMyAccountBook(user: UserIdDto): Promise<any>;
}
