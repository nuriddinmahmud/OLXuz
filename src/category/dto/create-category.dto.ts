import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Telefonlar' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsString()
  image: string;
}