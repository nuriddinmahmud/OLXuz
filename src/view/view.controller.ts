import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('View')
@Controller('views')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Post()
  create(@Body() dto: CreateViewDto) {
    return this.viewService.create(dto);
  }

  @Get()
  findAll() {
    return this.viewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewService.findOne(BigInt(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewService.remove(BigInt(id));
  }
}
