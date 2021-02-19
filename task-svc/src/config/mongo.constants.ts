import * as config from 'config';

const dbConfig: any = config.get('mongo')

export const MongoContants = {
    urls: process.env.DB_URL || dbConfig.url
}