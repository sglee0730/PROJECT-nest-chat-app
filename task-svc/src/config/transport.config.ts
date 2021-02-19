import * as config from 'config';

const transportConfig: any = config.get('rabbitMQ');

export const rabbitConfig = {
    host: process.env.TRANSPORT_HOST || transportConfig.host,
    port: process.env.TRANSPORT_PORT || transportConfig.port
}