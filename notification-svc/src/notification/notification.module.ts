import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { DynamoModule } from 'src/dynamo/dynamo.module';

@Module({
  imports: [DynamoModule],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
