import { AuthService } from 'src/auth/auth.service';
import { AccountBook } from 'src/entities/AccountBook';
import { TodayExpenses } from 'src/entities/TodayExpenses';
import { Repository } from 'typeorm';
import 'dayjs/locale/ko';
export declare class TodayexpensesService {
    private todayExpensesRepository;
    private accountBookRepository;
    private authService;
    constructor(todayExpensesRepository: Repository<TodayExpenses>, accountBookRepository: Repository<AccountBook>, authService: AuthService);
    CreateTodayExpenses(accountBookId: number, expenses: number, memo: string): Promise<any>;
    modifyTodayExpenses(id: number, accountBookId: number, expenses: number, memo: string): Promise<any>;
    getOneExpensesInfo(accountBookId: number, id: number, userId: number): Promise<any>;
    deleteAccountBook(accountBookId: number, id: number, userId: number): Promise<any>;
}
