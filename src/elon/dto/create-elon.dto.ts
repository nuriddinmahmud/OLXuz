import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdType } from '@prisma/client';

export class CreateElonDto {
  @ApiProperty({ example: 'iPhone 15 Pro' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Yangi, qadoqda' })
  @IsString()
  description: string;

  @ApiProperty({ enum: AdType, example: 'SELL' })
  @IsEnum(AdType)
  type: AdType;

  @ApiProperty({ example: 12000000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 4.8 })
  @IsNumber()
  star: number;

  @ApiProperty({ example: 'https://image.com/phone.jpg' })
  @IsString()
  image: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  region: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  colorId: number;
}
