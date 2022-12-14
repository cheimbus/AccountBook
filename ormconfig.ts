import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { AccountBook } from 'src/entities/AccountBook';
import { User } from 'src/entities/User';
import { RefreshToken } from 'src/entities/RefreshToken';
import { TodayExpenses } from 'src/entities/TodayExpenses';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.TEST === 'true' ? process.env.TEST_HOST : process.env.HOST,
  port:
    process.env.TEST === 'true'
      ? parseInt(process.env.TEST_DB_PORT)
      : parseInt(process.env.DB_PORT),
  username:
    process.env.TEST === 'true'
      ? process.env.TEST_USER_NAME
      : process.env.USER_NAME,
  password:
    process.env.TEST === 'true'
      ? process.env.TEST_PASSWORD
      : process.env.PASSWORD,
  database:
    process.env.TEST === 'true'
      ? process.env.TEST_DATABASE
      : process.env.DATABASE,
  entities: [AccountBook, User, RefreshToken, TodayExpenses],
  migrations: [path.join(__dirname, '/src/migrations/*.ts')],
  charset: 'utf8mb4',
  migrationsRun: true,
  synchronize: false,
  logging: true,
});

export default dataSource;
dataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error));
