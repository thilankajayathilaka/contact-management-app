import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
    example: '1234567890',
    description: 'Phone number of the contact',
    required: false,
  })
  @IsString({ message: 'Phone number must be a string.' })
  @IsOptional()
  phone?: string;
}
