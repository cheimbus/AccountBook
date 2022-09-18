import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodayExpenses } from './TodayExpenses';

@Entity()
export class AccountBook {
  @ApiProperty({
    example: 1,
    description: '가계부 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '시우의 가계부',
    description: '가계부 이름',
    required: true,
  })
  @Column({ type: 'varchar', name: 'name', length: 30 })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '티끌모아 태산 아끼자!',
    description: '각오',
    required: true,
  })
  @Column({ type: 'varchar', name: 'determination', length: 30 })
  determiantion: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 30000,
    description:
      '투입 금액. 사용자는 처음 자신의 자산을 가계부에 작성해야한다.',
    required: true,
  })
  @Column({ type: 'int', name: 'input_money' })
  input_money: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 20000,
    description: '현재 금액. 이것은 today_expenses와 합산해서 넣어지는 값이다.',
  })
  @Column({ type: 'int', name: 'current_money', default: 0 })
  current_money: number;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty({
    example: 'true',
    description:
      'soft delete를 하기위해 설정. string형식으로 true, false를 작성하되, true는 삭제된 가계부이고 false는 삭제가 안된 가계부이다. 가계부를 불러올 때 false인 가계부를 불러와야함',
  })
  @Column({ type: 'varchar', name: 'is_deleted' })
  is_deleted: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_ad' })
  updatedAt: Date;

  @OneToMany(() => TodayExpenses, (todayExpenses) => todayExpenses.accountBook)
  TodayExpenses: TodayExpenses;
}
