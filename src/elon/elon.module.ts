import { Module } from '@nestjs/common';
import { ElonService } from './elon.service';
import { ElonController } from './elon.controller';

@Module({
  controllers: [ElonController],
  providers: [ElonService],
})
export class ElonModule {}
