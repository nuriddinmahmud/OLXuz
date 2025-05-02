import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        chatId: BigInt(dto.chatId),
        senderId: BigInt(dto.senderId),
        content: dto.content,
      },
    });
  }

  findAll() {
    return this.prisma.message.findMany({
      include: {
        chat: true,
        sender: true,
      },
    });
  }

  async findOne(id: bigint) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        chat: true,
        sender: true,
      },
    });

    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  update(id: bigint, dto: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { id },
      data: {
        ...(dto.chatId && { chatId: BigInt(dto.chatId) }),
        ...(dto.senderId && { senderId: BigInt(dto.senderId) }),
        ...(dto.content && { content: dto.content }),
      },
    });
  }

  remove(id: bigint) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
