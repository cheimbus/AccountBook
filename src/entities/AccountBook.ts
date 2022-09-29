import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodayExpenses } from './TodayExpenses';
@Entity()
export class AccountBook {
  @ApiProperty({
    example: 1,
    description: '가계부 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '절약짱 시우의 가계부',
    description: '가계부 이름',
    required: true,
  })
  @Column({
    type: 'varchar',
    name: 'name',
    length: 30,
    nullable: true,
    default: null,
  })
  name: string;

  @ApiProperty({
    example: '티끌모아 태산',
    description: '가계부에 대한 각오를 작성합니다',
  })
  @Column({
    type: 'varchar',
    name: 'determination',
    length: 30,
    nullable: true,
    default: null,
  })
  determination: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 30000,
    description:
      '전체 투입금액입니다. 가계부에서 사용금액의 대략적인 것을 정하는 과정입니다. 수정하여 투입금액을 높일 수 있습니다.',
  })
  @Column({ type: 'int', name: 'input_money', default: 0 })
  input_money: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 30000,
    description:
      '현재 가계부에서 남은 금액입니다. 지출을 할때마다 업데이트됩니다.',
  })
  @Column({ type: 'int', name: 'current_money', default: 0 })
  current_money: number;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty({
    example: 'true',
    description:
      'soft delete를 하기위한 설정입니다. string형식으로 true, false를 작성하되, true는 삭제된 가계부이고 false는 삭제가 안된 가계부입니다. 가계부를 불러올 때 false인 가계부를 불러와야힙니다.',
  })
  @Column({ type: 'boolean', name: 'is_deleted', default: false })
  is_deleted: boolean;

  @Column({
    type: 'varchar',
    name: 'created_at',
    default: null,
    nullable: true,
  })
  createdAt: string | null;

  @Column({
    type: 'varchar',
    name: 'updated_at',
    default: null,
    nullable: true,
  })
  updatedAt: string | null;

  @Column({
    type: 'varchar',
    name: 'deleted_at',
    default: null,
    nullable: true,
  })
  deletedAt: string | null;

  @OneToMany(
    () => TodayExpenses,
    (todayExpenses) => todayExpenses.accountBookId,
  )
  TodayExpenses: TodayExpenses;
}
