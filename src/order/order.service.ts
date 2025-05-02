import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        userId: BigInt(dto.userId),
        elonId: BigInt(dto.elonId),
        quantity: dto.quantity,
        color: dto.color,
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        elon: true,
      },
    });
  }

  async findOne(id: bigint) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        elon: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  update(id: bigint, dto: UpdateOrderDto) {
    const data: any = {};

    if (dto.userId) data.userId = BigInt(dto.userId);
    if (dto.elonId) data.elonId = BigInt(dto.elonId);
    if (dto.quantity) data.quantity = dto.quantity;
    if (dto.color) data.color = dto.color;

    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  remove(id: bigint) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
