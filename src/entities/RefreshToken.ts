import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RefreshToken {
  @ApiProperty({
    example: 1,
    description: 'RefreshToken의 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({
    example: 'dfDSFEWekw#$199dAFS.fasfjdsfknDSF123.SDAFDSf3',
    description: '현재 RefreshToken',
  })
  @Column({ type: 'varchar', name: 'refresh_token', nullable: true })
  // null값 또는 token값을 넣어야 하므로 nullable:true로 설정 기본은 false
  refresh_token: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
