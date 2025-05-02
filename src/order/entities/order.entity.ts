import { ApiProperty } from '@nestjs/swagger';
import { ColorEnum } from '@prisma/client';

export class Order {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  userId: bigint;

  @ApiProperty()
  elonId: bigint;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ enum: ColorEnum })
  color: ColorEnum;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
