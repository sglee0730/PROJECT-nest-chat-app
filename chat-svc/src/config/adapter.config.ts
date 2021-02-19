import * as config from 'config';

const devConfig: any = config.get('adapter');

export const adapterConfig = {
    host: process.env.ADAPTER_HOST || devConfig.host,
    port: process.env.ADAPTER_PORT || devConfig.port,
}