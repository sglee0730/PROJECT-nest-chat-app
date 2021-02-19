import { awsConfig } from '../config/db.config';
import * as AWS from 'aws-sdk';

const connection = () => {
    AWS.config.update(awsConfig.remoteConfig);    
    const docClient = new AWS.DynamoDB.DocumentClient();

    return docClient;
}

export const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: () => connection()
}