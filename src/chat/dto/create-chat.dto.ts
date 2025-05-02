import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  elonId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  buyerId: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  sellerId: number;
}
