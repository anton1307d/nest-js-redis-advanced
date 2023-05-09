import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './enities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {XFetchCacheService} from "./x-fetch-cache.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repository: Repository<Post>,
  ) {}

  public async fakePosts(count: number): Promise<void> {
    let i = 0;

    while (count > i) {
      await this.repository.save({
        id: i,
        title: `title-${i}`,
        link: `fake-${i}`,
        text: `text-${i}`,
      });
      i++;
    }
  }
}
