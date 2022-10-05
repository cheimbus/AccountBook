import { UserIdDto } from 'src/user/dto/user.accountbookid.dto';
import { CreateTodayExpensesDto } from './dto/create.todayexpenses.dto';
import { ModifyTodayExpensesDto } from './dto/modify.todayexpenses.modify.dto';
import { TodayexpensesService } from './todayexpenses.service';
export declare class TodayexpensesController {
    private todayExpensesService;
    constructor(todayExpensesService: TodayexpensesService);
    createTodayExpenses(data: CreateTodayExpensesDto): Promise<any>;
    modifyTodayExpenses(data: ModifyTodayExpensesDto): Promise<any>;
    getOneExpensesInfo(accountbookid: number, id: number, user: UserIdDto): Promise<any>;
    deleteOneExpenses(accountbookid: number, id: number, user: UserIdDto): Promise<any>;
}
