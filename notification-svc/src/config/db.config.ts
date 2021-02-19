import * as config from 'config'
const iamConfig: { region: string, accessKeyId: string, secretAccessKey: string } = config.get('AWS');

export const awsConfig = {
    remoteConfig: {
        region: process.env.REGION || iamConfig.region,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || iamConfig.accessKeyId,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || iamConfig.secretAccessKey
    },
    tableName: 'notification'
}