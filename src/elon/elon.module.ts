import { Module } from '@nestjs/common';
import { ElonService } from './elon.service';
import { ElonController } from './elon.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module'; 

@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [ElonController],
  providers: [ElonService],
})
export class ElonModule {}
