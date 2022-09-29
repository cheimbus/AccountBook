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

@Entity()
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
  @Column({ type: 'int', name: 'current_money', nullable: true })
  currnet_money: number | null;

  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  @Column({
    type: 'int',
    name: 'account_book_id',
    nullable: true,
  })
  account_book_id: number | null;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  @Column({
    type: 'varchar',
    name: 'created_at',
    nullable: true,
    default: null,
  })
  createdAt: string | null;

  @Column({
    type: 'varchar',
    name: 'updated_at',
    nullable: true,
    default: null,
    select: false,
  })
  updatedAt: string | null;

  @ManyToOne(() => AccountBook, (accountBook) => accountBook.TodayExpenses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_book_id', referencedColumnName: 'id' }])
  accountBookId: AccountBook;
}
