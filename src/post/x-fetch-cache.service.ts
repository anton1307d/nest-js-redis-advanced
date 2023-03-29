import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class XFetchCacheService {
  public static DELTA_KEY_PREFIX = 'delta';
  public static BETA = 4;

  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  private async isEarlyRecomputeRequired(key: string): Promise<boolean> {
    const keyTtlInSeconds = await this.cacheService.store.ttl(key);

    const delta =
      (await this.cacheService.store.get<number>(
        XFetchCacheService.DELTA_KEY_PREFIX + key,
      )) ?? 1;

    const random = Math.random();

    const xfetch = delta * XFetchCacheService.BETA * Math.log(random);

    const currentTimestampInSeconds = Math.round(Date.now() / 1000);

    const cacheExpiresAt = currentTimestampInSeconds + keyTtlInSeconds;

    return currentTimestampInSeconds - xfetch >= cacheExpiresAt;
  }

  public async get<T>(key: string): Promise<T | null> {
    // if (await this.isEarlyRecomputeRequired(key)) {
    //   return null;
    // }

    return await this.cacheService.get<T>(key);
  }

  public async set<T>(
    key: string,
    value: T,
    ttl: number,
    computedTimeInSec: number = 1,
  ): Promise<T> {
    await this.cacheService.set<number>(
      XFetchCacheService.DELTA_KEY_PREFIX + key,
      computedTimeInSec,
      ttl,
    );

    return await this.cacheService.set<T>(key, value, ttl);
  }
}
