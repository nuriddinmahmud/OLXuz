import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateViewDto } from './dto/create-view.dto';

@Injectable()
export class ViewService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateViewDto) {
    return this.prisma.view.create({
      data: {
        userId: dto.userId ? BigInt(dto.userId) : undefined,
        elonId: BigInt(dto.elonId),
      },
    });
  }

  findAll() {
    return this.prisma.view.findMany({
      include: {
        user: true,
        elon: true,
      },
    });
  }

  async findOne(id: bigint) {
    const view = await this.prisma.view.findUnique({
      where: { id },
      include: {
        user: true,
        elon: true,
      },
    });

    if (!view) throw new NotFoundException('View not found');
    return view;
  }

  remove(id: bigint) {
    return this.prisma.view.delete({
      where: { id },
    });
  }
}
