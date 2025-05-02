import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElonService } from './elon.service';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Elon')
@Controller('elons')
export class ElonController {
  constructor(private readonly elonService: ElonService) {}

  @Post()
  create(@Body() dto: CreateElonDto) {
    return this.elonService.create(dto);
  }

  @Get()
  findAll() {
    return this.elonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elonService.findOne(BigInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateElonDto) {
    return this.elonService.update(BigInt(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elonService.remove(BigInt(id));
  }
}
