import { Injectable } from '@nestjs/common';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';

@Injectable()
export class ElonService {
  create(createElonDto: CreateElonDto) {
    return 'This action adds a new elon';
  }

  findAll() {
    return `This action returns all elon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} elon`;
  }

  update(id: number, updateElonDto: UpdateElonDto) {
    return `This action updates a #${id} elon`;
  }

  remove(id: number) {
    return `This action removes a #${id} elon`;
  }
}
