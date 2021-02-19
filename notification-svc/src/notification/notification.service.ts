import { Body, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { awsConfig } from 'src/config/db.config';
import * as moment from 'moment';
import { getDto, produceDto } from './dto/dynamo.dto';
import { v4 as uuid } from 'uuid'

@Injectable()
export class NotificationService {
  constructor(
    @Inject('CONNECTION') private client: DynamoDB.DocumentClient,
  ) {}

  async scan(): Promise<any> {
      const result = await this.client.scan({
          TableName: awsConfig.tableName,
      })
      .promise()
      .then(response => response)
      .catch(err => {
          throw new InternalServerErrorException(err)
      });

      return result;
  };

  async put(@Body() dto: produceDto): Promise<any> {
    const { email, producer, message } = dto;
    const result = await this.client.put({
      TableName: awsConfig.tableName,
      Item: {
        email: email,
        message_id: uuid(),
        producer: producer,
        message: message,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
        isChecked: false,
      }
    })
    .promise()
    .then(response => response)
    .catch(err => {
      throw new InternalServerErrorException(err);
    })

    return result;
  };

  async get(@Body() dto: getDto): Promise<any> {
    const { email } = dto;
    const result = await this.client.query({
      TableName: awsConfig.tableName,
      KeyConditionExpression: 'email = :v',
      FilterExpression: 'isChecked = :b',
      ExpressionAttributeValues: {
        ":v": email,
        ":b": false
      },
    })
    .promise()
    .then(response => response)
    .catch(err => {
      throw new InternalServerErrorException(err);
    })

    return result;
  };

  async update(@Body() dto: getDto): Promise<any> {
    const { email, message_id } = dto;
    const result = await this.client.update({
      TableName: awsConfig.tableName,
      Key: {
        email: email,
        message_id: message_id
      },
      UpdateExpression: "set isChecked = :b, checkAt = :t",
      ExpressionAttributeValues: {
        ":b": true,
        ":t": moment().format("YYYY-MM-DD HH:mm:ss") 
      },
      ReturnValues: "UPDATED_NEW"
    })
    .promise()
    .then(response => response)
    .catch(err => {
      throw new InternalServerErrorException(err);
    })

    return result;
  }
}
