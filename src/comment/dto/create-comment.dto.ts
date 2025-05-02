import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Yaxshi e’lon!' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  stars: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userID: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  elonID: number;
}
