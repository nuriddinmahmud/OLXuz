import { AdType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Elon {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: AdType })
  type: AdType;

  @ApiProperty()
  price: number;

  @ApiProperty()
  star: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  userId: bigint;

  @ApiProperty()
  categoryId: bigint;

  @ApiProperty()
  region: bigint;

  @ApiProperty()
  colorId: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
