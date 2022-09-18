import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountBook } from './AccountBook';

@Entity()
export class TodayExpenses {
  @ApiProperty({
    example: 1,
    description: 'TodayExpenses 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 20000,
    description: '지출 금액',
  })
  @Column({ type: 'int', name: 'expenses' })
  expenses: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '스타벅스 아메리카노',
    description: '지출한 내역 메모',
  })
  @Column({ type: 'varchar', name: 'memo' })
  memo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => AccountBook, (accountBook) => accountBook.TodayExpenses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_book_id', referencedColumnName: 'id' }])
  accountBook: AccountBook;
}
