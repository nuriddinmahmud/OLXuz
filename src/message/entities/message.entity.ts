import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  chatId: bigint;

  @ApiProperty()
  senderId: bigint;

  @ApiProperty()
  content: string;

  @ApiProperty()
  sentAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
