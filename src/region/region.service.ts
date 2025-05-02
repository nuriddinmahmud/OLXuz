import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateRegionDto) {
    return this.prisma.region.create({ data: dto });
  }

  findAll() {
    return this.prisma.region.findMany();
  }

  async findOne(id: bigint) {
    const region = await this.prisma.region.findUnique({ where: { id } });
    if (!region) throw new NotFoundException('Region not found');
    return region;
  }

  update(id: bigint, dto: UpdateRegionDto) {
    return this.prisma.region.update({ where: { id }, data: dto });
  }

  remove(id: bigint) {
    return this.prisma.region.delete({ where: { id } });
  }
}
