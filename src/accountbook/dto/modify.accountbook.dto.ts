import { ApiProperty } from '@nestjs/swagger';

export class ModifyAccountbookDto {
  @ApiProperty({
    example: '돈안쓰는 시우의 가계부',
    description: '가계부 이름 수정합니다.',
  })
  name: string;

  @ApiProperty({
    example: '티끌모아 태산이란걸 잊지말자',
    description: '가계부의 각오를 수정합니다.',
  })
  determination: string;

  @ApiProperty({
    example: 100000,
    description: '가계부의 투입금액을 수정합니다. 현재 투입금액과 중첩됩니다.',
  })
  inputMoney: number;
}
