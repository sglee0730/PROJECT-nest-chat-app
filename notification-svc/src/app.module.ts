import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { DynamoModule } from './dynamo/dynamo.module';

@Module({
  imports: [NotificationModule, DynamoModule],
})
export class AppModule {}
