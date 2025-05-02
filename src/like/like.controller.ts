import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Like')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@Body() dto: CreateLikeDto) {
    return this.likeService.create(dto);
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(BigInt(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(BigInt(id));
  }

  @Delete('remove/by-user/:userId/:elonId')
  removeByUserAndElon(
    @Param('userId') userId: string,
    @Param('elonId') elonId: string,
  ) {
    return this.likeService.removeByUserAndElon(+userId, +elonId);
  }
}
