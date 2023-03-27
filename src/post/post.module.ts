import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './enities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {XFetchCacheService} from "./x-fetch-cache.service";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, XFetchCacheService],
})
export class PostModule {}
