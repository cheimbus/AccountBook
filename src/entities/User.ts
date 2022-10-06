import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountBook } from './AccountBook';
import { RefreshToken } from './RefreshToken';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'siu@naver.com',
    description: '이메일',
    required: true,
  })
  @Column({ type: 'varchar', name: 'email', unique: true, length: 30 })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '가계부하면시우',
    description: '닉네임',
    required: true,
  })
  @Column({ type: 'varchar', name: 'nickname', unique: true, length: 30 })
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'A$dawjdo123',
    description: '비밀번호',
    required: true,
  })
  @Column({ type: 'varchar', name: 'password', length: 200, select: false })
  password: string;

  @Column({
    type: 'varchar',
    name: 'createdAt',
    nullable: true,
    default: null,
  })
  createdAt: string | null;

  @Column({
    type: 'varchar',
    name: 'updatedAt',
    nullable: true,
    default: null,
  })
  updatedAt: string | null;

  @OneToOne(() => AccountBook)
  @JoinColumn([{ name: 'accountBookId', referencedColumnName: 'id' }])
  accountBookId: AccountBook;

  @OneToOne(() => RefreshToken)
  @JoinColumn([{ name: 'refreshTokenId', referencedColumnName: 'id' }])
  refreshTokenId: RefreshToken;
}
