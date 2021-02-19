import * as config from 'config';

const devConfig: any = config.get('redis') 

export const redisConfig = {
    host: process.env.CACHE_HOST || devConfig.host,
    port: process.env.CACHE_PORT || devConfig.port,
}