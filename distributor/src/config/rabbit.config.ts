import * as config from 'config';

export const rabbitConfig = process.env.TRANSPORT || config.get('rabbitMQ.url');

