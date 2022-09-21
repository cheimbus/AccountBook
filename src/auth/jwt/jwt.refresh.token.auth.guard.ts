import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class jwtRefreshTokenAuthGuard extends AuthGuard(
  'jwtRefreshTokenAuthGuard',
) {}
