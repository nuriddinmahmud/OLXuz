import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateChatDto) {
    return this.prisma.realtimeChat.create({
      data: {
        elonId: BigInt(dto.elonId),
        buyerId: BigInt(dto.buyerId),
        sellerId: BigInt(dto.sellerId),
      },
    });
  }

  findAll() {
    return this.prisma.realtimeChat.findMany({
      include: { elon: true, buyer: true, seller: true, messages: true },
    });
  }

  async findOne(id: bigint) {
    const chat = await this.prisma.realtimeChat.findUnique({
      where: { id },
      include: { elon: true, buyer: true, seller: true, messages: true },
    });
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }

  remove(id: bigint) {
    return this.prisma.realtimeChat.delete({ where: { id } });
  }
}
