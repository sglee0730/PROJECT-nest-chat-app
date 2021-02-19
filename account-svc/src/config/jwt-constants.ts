import * as config from 'config';

const devConfig: any = config.get('jwt')

export const jwtConstants = {
    secret: process.env.JWT_SECRET || devConfig.secret,
};