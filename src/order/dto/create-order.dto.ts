import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ColorEnum } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  elonId: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ enum: ColorEnum, example: ColorEnum.GREEN })
  @IsEnum(ColorEnum)
  color: ColorEnum;
}
