import { ApiProperty } from '@nestjs/swagger';

export class Region {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
