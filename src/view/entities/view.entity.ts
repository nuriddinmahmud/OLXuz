import { ApiProperty } from '@nestjs/swagger';

export class View {
  @ApiProperty()
  id: bigint;

  @ApiProperty({ required: false, nullable: true })
  userId?: bigint | null;

  @ApiProperty()
  elonId: bigint;

  @ApiProperty()
  viewedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
