import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  text: string;

  @ApiProperty()
  stars: number;

  @ApiProperty()
  userId: bigint;

  @ApiProperty()
  elonId: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
