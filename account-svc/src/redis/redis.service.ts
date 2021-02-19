import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async validateToken(key: string): Promise<string> {
        const result = await this.cacheManager.get(key);

        if (!result) {
            return null;
        }

        return result;
    }

    async setToken(key: string, value: string): Promise<void> {
        await this.cacheManager.set(key, value, { ttl: 7200 });
        
    }
}
