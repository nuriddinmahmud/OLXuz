import { ApiProperty } from '@nestjs/swagger';

export class Chat {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  elonId: bigint;

  @ApiProperty()
  buyerId: bigint;

  @ApiProperty()
  sellerId: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
