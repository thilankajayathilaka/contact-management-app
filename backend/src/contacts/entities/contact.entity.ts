import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the contact.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the contact.',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the contact.',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the contact.',
    required: false,
  })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example: '2025-02-28T04:42:19.338Z',
    description: 'The creation timestamp of the contact.',
  })
  @CreateDateColumn()
  createdAt: Date;
}
