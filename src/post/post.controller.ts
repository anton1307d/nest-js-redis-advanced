import {
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(public readonly postService: PostService) {}

  @Get('random')
  findRandom() {
    return this.postService.randomPost();
  }

  @Get(':id')
  findOne(@Param() params) {
    return this.postService.getPost(+params.id);
  }

  @Get('fake/:count')
  fake(@Param() params) {
    return this.postService.fakePosts(+params.count);
  }
}
