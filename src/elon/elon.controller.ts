import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ElonService } from './elon.service';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Elon')
@ApiBearerAuth() 
@UseGuards(AuthGuard('jwt')) 
@Controller('elons')
export class ElonController {
  constructor(private readonly elonService: ElonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new elon' })
  create(@Body() dto: CreateElonDto) {
    return this.elonService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all elons with filters' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'regionId', required: false, type: Number })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('regionId') regionId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.elonService.findAll({
      search,
      categoryId: categoryId ? BigInt(categoryId) : undefined,
      regionId: regionId ? BigInt(regionId) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find elon by ID' })
  findOne(@Param('id') id: string) {
    return this.elonService.findOne(BigInt(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update elon by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateElonDto) {
    return this.elonService.update(BigInt(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete elon by ID' })
  remove(@Param('id') id: string) {
    return this.elonService.remove(BigInt(id));
  }
}
