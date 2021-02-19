import { CacheModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-redis-store';
import { redisConfig } from 'src/config/cache.config';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
  
})
export class RedisModule {}
