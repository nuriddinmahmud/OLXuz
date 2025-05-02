import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';

@Injectable()
export class ElonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateElonDto & { image: string }) {
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

  async findAll(query: {
    search?: string;
    categoryId?: bigint;
    regionId?: bigint;
    minPrice?: number;
    maxPrice?: number;
    page: number;
    limit: number;
  }) {
    const { search, categoryId, regionId, minPrice, maxPrice, page, limit } = query;

    const where: any = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(regionId && { regionId }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { lte: maxPrice } }),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.elon.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          user: {
            select: {
              fullname: true,
              image: true,
            },
          },
          color: true,
          region: true,
        },
      }),
      this.prisma.elon.count({ where }),
    ]);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      items,
    };
  }

  async findOne(id: bigint, userId?: bigint) {
    await this.prisma.view.create({
      data: {
        elonId: id,
        userId: userId ?? null,
      },
    });
  
    const elon = await this.prisma.elon.findUnique({
      where: { id },
      include: {
        category: true,
        user: { select: { fullname: true, image: true } },
        color: true,
        region: true,
      },
    });
  
    if (!elon) throw new NotFoundException('Elon topilmadi');
    return elon;
  }
  

  async update(id: bigint, dto: UpdateElonDto & { image?: string }) {
    const data: any = {};
  
    if (dto.name) data.name = dto.name;
    if (dto.description) data.description = dto.description;
    if (dto.type) data.type = dto.type;
    if (dto.price) data.price = dto.price;
    if (dto.discount) data.discount = dto.discount;
    if (dto.userId) data.userId = BigInt(dto.userId);
    if (dto.categoryId) data.categoryId = BigInt(dto.categoryId);
    if (dto.colorId) data.colorId = BigInt(dto.colorId);
    if (dto.region) data.regionId = BigInt(dto.region);
    if (dto.image) data.image = dto.image;
  
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
