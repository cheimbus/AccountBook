import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountBook } from './AccountBook';

@Entity('today_expenses')
export class TodayExpenses {
  @ApiProperty({
    example: 1,
    description: 'TodayExpenses 아이디입니다.',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  @ApiProperty({
    example: 5000,
    description: '지출 금액입니다.',
  })
  @Column({ type: 'int', name: 'expenses', nullable: true })
  expenses: number | null;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  @ApiProperty({
    example: '스타벅스 아메리카노',
    description: '지출한 내역 메모합니다.',
  })
  @Column({ type: 'varchar', name: 'memo', nullable: true })
  memo: string | null;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  @ApiProperty({
    example: '스타벅스 아메리카노',
    description: '지출한 내역 메모합니다.',
  })
  @Column({ type: 'int', name: 'currnetMoney', nullable: true })
  currnetMoney: number | null;

  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  @Column({
    type: 'int',
    name: 'accountBookId',
    nullable: true,
  })
  accountBookId: number | null;

  @ValidateIf((object, value) => value !== null)
  @IsString()
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
    select: false,
  })
  updatedAt: string | null;

  @ManyToOne(() => AccountBook, (accountBook) => accountBook.todayExpenses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'accountBookId', referencedColumnName: 'id' }])
  AccountBookId: AccountBook;
}
