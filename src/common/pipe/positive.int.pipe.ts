import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositivePipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new BadRequestException('id는 양수이어야 합니다.');
    }
    if (parseInt(String(value)) < value) {
      throw new BadRequestException('id는 정수이어야 합니다.');
    }
    return value;
  }
}
