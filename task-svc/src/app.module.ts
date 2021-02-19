import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { MongoContants } from './config/mongo.constants';

@Module({
  imports: [
    TaskModule, 
    MongooseModule.forRoot(MongoContants.urls),
    ]
})
export class AppModule {}
