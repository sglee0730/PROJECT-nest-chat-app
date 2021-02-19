import * as config from 'config';

const devConfig: any = config.get('rabbitMQ');

export const rabbitConfig = {
    host: process.env.TRANSPORT_HOST || devConfig.host,
    port: process.env.TRANSPORT_PORT || devConfig.port
}