import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountBook } from './AccountBook';
import { RefreshToken } from './RefreshToken';

@Entity()
export class Users {
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
  })
  @Column({ type: 'varchar', name: 'email', unique: true, length: 30 })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '가계부잘세워요',
    description: '닉네임',
  })
  @Column({ type: 'varchar', name: 'nickname', unique: true, length: 30 })
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'A$dawjdo123',
    description: '비밀번호',
  })
  @Column({ type: 'varchar', name: 'password', length: 200, select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => AccountBook)
  @JoinColumn([{ name: 'accountbookId', referencedColumnName: 'id' }])
  accountbook: AccountBook;

  @OneToOne(() => RefreshToken)
  @JoinColumn([{ name: 'refreshtokenId', referencedColumnName: 'id' }])
  refreshtoken: RefreshToken;
}
