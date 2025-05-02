import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        fullname: dto.fullname,
        email: dto.email,
        password: hashed,
        phone: dto.phone,
        location: dto.location,
        image: dto.image,
        regionId: BigInt(dto.regionId),
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: bigint) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: bigint, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: bigint) {
    return this.prisma.user.delete({ where: { id } });
  }
}
  