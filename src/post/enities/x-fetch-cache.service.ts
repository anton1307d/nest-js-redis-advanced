import {CACHE_MANAGER, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Post} from "./enities/post.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Cache} from 'cache-manager';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) private repository: Repository<Post>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    public async getPost(id: number): Promise<Post|null>
    {
        let cachedData;

        cachedData =  await this.xFetchGet<Post>(
            id.toString(),
        );

        if (cachedData) {
            return cachedData;
        }

        const start = Math.round(Date.now() / 1000);

        const data = await this.repository.findOneBy({id: id});

        if (data) {
            await this.cacheService.set(id.toString(), data, {ttl: 25});
            const resulted = Math.round(Date.now() / 1000) - start;
            await this.cacheService.set('delta' + id.toString(), resulted+1);
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

    public async isEarlyRecomputeRequired(key: string): Promise<boolean>
    {
       const keyTtlInSeconds = await this.cacheService.store.ttl(key);

       const delta = await this.cacheService.store.get<number>('delta' + key) ?? 1;

       const beta = 4;
       const random = Math.random();

       const xfetch = delta * beta * Math.log(random);

       const currentTimestampInSeconds = Math.round(Date.now() / 1000);

       const cacheExpiresAt = currentTimestampInSeconds + keyTtlInSeconds;

        return (currentTimestampInSeconds - xfetch)
            >= cacheExpiresAt;
    }

    public async xFetchGet<T>(key: string): Promise<T|null>
    {
        if (await this.isEarlyRecomputeRequired(key)) {
            return null;
        }

        return await this.cacheService.get<T>(key);
    }


}
