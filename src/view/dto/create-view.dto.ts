import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateViewDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  elonId: number;
}
