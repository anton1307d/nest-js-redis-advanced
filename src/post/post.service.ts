import { Injectable, NotFoundException} from '@nestjs/common';
import {Post} from "./enities/post.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {XFetchCacheService} from "./enities/x-fetch-cache.service";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) private repository: Repository<Post>,
        private cacheService: XFetchCacheService,
    ) {}

    public async getPost(id: number): Promise<Post|null>
    {
        let cachedData;

        cachedData =  await this.cacheService.get<Post>(
            id.toString(),
        );

        if (cachedData) {
            return cachedData;
        }

        const start = Math.round(Date.now() / 1000);

        const data = await this.repository.createQueryBuilder('posts')
            .where(' "posts"."id" = :id',{'id': id})
            .andWhere(' "posts"."title" NOT IN (:...ids)', {ids: [1, 12, 1]})
            .orderBy('random()')
            .getOne();

        if (data) {
            const resulted = Math.round(Date.now() / 1000) - start;
            await this.cacheService.set(id.toString(), data, 25, resulted+1);
            return data;
        }

        throw new NotFoundException();
    }

    public async randomPost()
    {
       const random = Math.floor((Math.random()*10000)+1);

       return await this.getPost(random);
    }

    public async fakePosts(count: number): Promise<void>
    {
        let i = 0;

        while (count > i) {
            await this.repository.save({
                title: `title-${i}`,
                link: `fake-${i}`,
                text: `text-${i}`
                });
            i++;
        }
    }
}
