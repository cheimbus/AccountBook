"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const posix_1 = __importDefault(require("path/posix"));
const AccountBook_1 = require("./entities/AccountBook");
const RefreshToken_1 = require("./entities/RefreshToken");
const TodayExpenses_1 = require("./entities/TodayExpenses");
const Users_1 = require("./entities/Users");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const accountbook_module_1 = require("./accountbook/accountbook.module");
const todayexpenses_module_1 = require("./todayexpenses/todayexpenses.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forFeature([Users_1.Users, AccountBook_1.AccountBook, RefreshToken_1.RefreshToken, TodayExpenses_1.TodayExpenses]),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        type: 'mysql',
                        host: configService.get('TEST') === 'true'
                            ? configService.get('TEST_HOST')
                            : configService.get('HOST'),
                        port: configService.get('TEST') === 'true'
                            ? configService.get('TEST_DB_PORT')
                            : configService.get('DB_PORT'),
                        username: configService.get('TEST') === 'true'
                            ? configService.get('TEST_USER_NAME')
                            : configService.get('USER_NAME'),
                        password: configService.get('TEST') === 'true'
                            ? configService.get('TEST_PASSWORD')
                            : configService.get('PASSWORD'),
                        database: configService.get('TEST') === 'true'
                            ? configService.get('TEST_DATABASE')
                            : configService.get('DATABASE'),
                        entities: [posix_1.default.join(__dirname, 'src/entitis/*')],
                        cli: { migrationsDir: 'src/migrations' },
                        charset: 'utf8mb4',
                        synchronize: false,
                        autoLoadEntities: true,
                        keepConnectionAlive: true,
                        logging: true,
                    };
                },
            }),
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
            accountbook_module_1.AccountbookModule,
            todayexpenses_module_1.TodayexpensesModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map