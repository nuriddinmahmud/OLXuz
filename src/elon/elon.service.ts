import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';

@Injectable()
export class ElonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateElonDto) {
    return this.prisma.elon.create({
      data: {
        name: dto.name,
        description: dto.description,
        type: dto.type,
        price: dto.price,
        image: dto.image,
        discount: dto.discount,
        userId: BigInt(dto.userId),
        categoryId: BigInt(dto.categoryId),
        colorId: BigInt(dto.colorId),
        regionId: BigInt(dto.region), 
      },
    });
  }

  async findAll() {
    return this.prisma.elon.findMany({
      include: {
        category: true,
        user: true,
        color: true,
        region: true,
      },
    });
  }

  async findOne(id: bigint) {
    const elon = await this.prisma.elon.findUnique({
      where: { id },
      include: {
        category: true,
        user: true,
        color: true,
        region: true,
      },
    });

    if (!elon) throw new NotFoundException('Elon topilmadi');
    return elon;
  }

  async update(id: bigint, dto: UpdateElonDto) {
    const data: any = {};

    if (dto.name) data.name = dto.name;
    if (dto.description) data.description = dto.description;
    if (dto.type) data.type = dto.type;
    if (dto.price) data.price = dto.price;
    if (dto.image) data.image = dto.image;
    if (dto.discount) data.discount = dto.discount;
    if (dto.userId) data.userId = BigInt(dto.userId);
    if (dto.categoryId) data.categoryID = BigInt(dto.categoryId);
    if (dto.colorId) data.colorId = BigInt(dto.colorId);
    if (dto.region) data.region = { connect: { id: BigInt(dto.region) } };

    return this.prisma.elon.update({
      where: { id },
      data,
    });
  }

  async remove(id: bigint) {
    return this.prisma.elon.delete({
      where: { id },
    });
  }
}
