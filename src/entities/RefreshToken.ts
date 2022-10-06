import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_tokens')
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
  @Column({
    type: 'varchar',
    name: 'refreshToken',
    nullable: true,
    default: null,
  })
  // null값 또는 token값을 넣어야 하므로 nullable:true로 설정 기본은 false
  refreshToken: string | null;

  @Column({
    type: 'varchar',
    name: 'createdAt',
    nullable: true,
    default: null,
  })
  createdAt: string | null;
}
