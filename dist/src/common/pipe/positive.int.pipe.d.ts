import { PipeTransform } from '@nestjs/common';
export declare class PositivePipe implements PipeTransform {
    transform(value: number): number;
}
