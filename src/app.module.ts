import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path/posix';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountBook } from './entities/AccountBook';
import { RefreshToken } from './entities/RefreshToken';
import { TodayExpenses } from './entities/TodayExpenses';
import { Users } from './entities/Users';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccountbookModule } from './accountbook/accountbook.module';
import { TodayexpensesModule } from './todayexpenses/todayexpenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Users, AccountBook, RefreshToken, TodayExpenses]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_HOST')
              : configService.get('HOST'),
          port:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_DB_PORT')
              : configService.get('DB_PORT'),
          username:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_USER_NAME')
              : configService.get('USER_NAME'),
          password:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_PASSWORD')
              : configService.get('PASSWORD'),
          database:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_DATABASE')
              : configService.get('DATABASE'),
          entities: [path.join(__dirname, 'src/entitis/*')],
          cli: { migrationsDir: 'src/migrations' },
          charset: 'utf8mb4',
          synchronize: false,
          autoLoadEntities: true,
          keepConnectionAlive: true,
          logging: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    AccountbookModule,
    TodayexpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
