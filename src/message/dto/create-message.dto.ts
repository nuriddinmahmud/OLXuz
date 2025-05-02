import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  chatId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  senderId: number;

  @ApiProperty({ example: 'Assalomu alaykum!' })
  @IsString()
  content: string;
}
