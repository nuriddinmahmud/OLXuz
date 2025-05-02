import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLikeDto) {
    return this.prisma.like.create({
      data: {
        userId: BigInt(dto.userId),
        elonId: BigInt(dto.elonId),
      },
    });
  }

  findAll() {
    return this.prisma.like.findMany({
      include: { user: true, elon: true },
    });
  }

  async findOne(id: bigint) {
    const like = await this.prisma.like.findUnique({ where: { id } });
    if (!like) throw new NotFoundException('Like not found');
    return like;
  }

  remove(id: bigint) {
    return this.prisma.like.delete({ where: { id } });
  }

  async removeByUserAndElon(userId: number, elonId: number) {
    const like = await this.prisma.like.findUnique({
      where: {
        userId_elonId: {
          userId: BigInt(userId),
          elonId: BigInt(elonId),
        },
      },
    });
    if (!like) throw new NotFoundException('Like not found');
    return this.prisma.like.delete({
      where: { id: like.id },
    });
  }
}
