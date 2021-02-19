import { Module } from '@nestjs/common';
import { connectionFactory } from './dynamo.connection';

@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION']
})
export class DynamoModule {}
