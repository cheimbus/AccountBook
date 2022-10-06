import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBook } from 'src/entities/AccountBook';
import { RefreshToken } from 'src/entities/RefreshToken';
import { TodayExpenses } from 'src/entities/TodayExpenses';
import { User } from 'src/entities/User';
import { UsersModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessTokenStrategy } from './jwt/jwt.access.token.strategy';
import { JwtRefreshTokenStrategy } from './jwt/jwt.refresh.token.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User, RefreshToken, AccountBook, TodayExpenses]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
