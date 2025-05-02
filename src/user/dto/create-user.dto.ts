import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'ali@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Toshkent' })
  @IsString()
  location: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/300' })
  @IsString()
  image: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  regionId: number;

  @ApiProperty({ example: '2003-05-12' })
  @IsDateString()
  year: string;
}
