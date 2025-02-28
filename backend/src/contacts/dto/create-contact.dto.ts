import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the contact' })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the contact',
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @ApiProperty({
    example: '0712345678',
    description: 'Phone number of the contact (only digits allowed)',
    required: false,
  })
  @IsString({ message: 'Phone number must be a string.' })
  @IsOptional()
  @Matches(/^\d+$/, { message: 'Phone number must contain only digits.' })
  phone?: string;
}
