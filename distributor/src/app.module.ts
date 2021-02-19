import { Module } from '@nestjs/common';
import { FriendModule } from './friend/friend.module';
import { ScraperModule } from './scraper/scraper.module';
import { AccountModule } from './account/account.module';
import { TaskModule } from './task/task.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    FriendModule,
    ScraperModule,
    AccountModule,
    TaskModule,
    NotificationModule
  ],
})
export class AppModule {}
