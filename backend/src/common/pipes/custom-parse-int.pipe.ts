import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Invalid contact ID: "${value}" is not a valid number. Please provide a numeric ID.`,
      );
    }
    return val;
  }
}
