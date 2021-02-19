import * as config from 'config';

const devConfig: any = config.get('neo4j')

export const neoConfig = {
    host: process.env.DB_HOST || devConfig.host,
    port: process.env.DB_PORT || devConfig.port,
    username: process.env.DB_USER || devConfig.username,
    password: process.env.DB_PASSWORD || devConfig.password
}