import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({ example: 'Toshkent shahri' })
  @IsString()
  name: string;
}
