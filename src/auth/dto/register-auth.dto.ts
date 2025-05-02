import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  @IsOptional()
  role?: Role;

  @ApiProperty({ example: 1 })
  @IsNumber()
  regionId: number;

  @ApiProperty({ example: '2002-08-16' })
  @IsDateString()
  year: string;
}
