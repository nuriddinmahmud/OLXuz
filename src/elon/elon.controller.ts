import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElonService } from './elon.service';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';

@Controller('elon')
export class ElonController {
  constructor(private readonly elonService: ElonService) {}

  @Post()
  create(@Body() createElonDto: CreateElonDto) {
    return this.elonService.create(createElonDto);
  }

  @Get()
  findAll() {
    return this.elonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElonDto: UpdateElonDto) {
    return this.elonService.update(+id, updateElonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elonService.remove(+id);
  }
}
