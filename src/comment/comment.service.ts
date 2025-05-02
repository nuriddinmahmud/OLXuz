import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        text: dto.text,
        stars: dto.stars,
        userId: BigInt(dto.userID),
        elonId: BigInt(dto.elonID),
      },
    });
  }

  findAll() {
    return this.prisma.comment.findMany({
      include: {
        user: true,
        elon: true,
      },
    });
  }

  async findOne(id: bigint) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: true,
        elon: true,
      },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  update(id: bigint, dto: UpdateCommentDto) {
    const data: any = {};

    if (dto.text) data.text = dto.text;
    if (dto.stars) data.stars = dto.stars;
    if (dto.userID) data.userId = BigInt(dto.userID);
    if (dto.elonID) data.elonId = BigInt(dto.elonID);

    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  remove(id: bigint) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
