import { ApiProperty } from '@nestjs/swagger';

export class Like {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  userId: bigint;

  @ApiProperty()
  elonId: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
