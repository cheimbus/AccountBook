import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Users } from 'src/entities/Users';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.TEST_HOST,
  port: parseInt(process.env.TEST_DB_PORT),
  username: process.env.TEST_USER_NAME,
  password: process.env.TEST_PASSWORD,
  database: process.env.TEST_DATABASE,
  entities: [Users],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
});

export default dataSource;
dataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error));
