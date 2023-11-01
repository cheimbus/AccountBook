"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const AccountBook_1 = require("./src/entities/AccountBook");
const User_1 = require("./src/entities/User");
const RefreshToken_1 = require("./src/entities/RefreshToken");
const TodayExpenses_1 = require("./src/entities/TodayExpenses");
dotenv_1.default.config();
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.TEST === 'true' ? process.env.TEST_HOST : process.env.HOST,
    port: process.env.TEST === 'true'
        ? parseInt(process.env.TEST_DB_PORT)
        : parseInt(process.env.DB_PORT),
    username: process.env.TEST === 'true'
        ? process.env.TEST_USER_NAME
        : process.env.USER_NAME,
    password: process.env.TEST === 'true'
        ? process.env.TEST_PASSWORD
        : process.env.PASSWORD,
    database: process.env.TEST === 'true'
        ? process.env.TEST_DATABASE
        : process.env.DATABASE,
    entities: [AccountBook_1.AccountBook, User_1.User, RefreshToken_1.RefreshToken, TodayExpenses_1.TodayExpenses],
    migrations: [path_1.default.join(__dirname, '/src/migrations/*.ts')],
    charset: 'utf8mb4',
    migrationsRun: true,
    synchronize: false,
    logging: true,
});
exports.default = dataSource;
dataSource
    .initialize()
    .then(() => console.log('Data Source has been initialized'))
    .catch((error) => console.error('Error initializing Data Source', error));
//# sourceMappingURL=ormconfig.js.map