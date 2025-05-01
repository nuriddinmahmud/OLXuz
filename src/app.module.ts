import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ElonModule } from './elon/elon.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { CategoryModule } from './category/category.module';
import { RegionModule } from './region/region.module';

@Module({
  imports: [AuthModule, UserModule, ElonModule, OrderModule, CommentModule, ChatModule, MessageModule, LikeModule, ViewModule, CategoryModule, RegionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
