import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitConfig } from 'src/config/rabbit.config';
import { FriendController } from './friend.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FRIEND_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${rabbitConfig}`],
          queue: 'friend_queue',
          queueOptions: {
            durable: false
          }
        }
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${rabbitConfig}`],
          queue: 'notification_queue',
          queueOptions: {
            durable: false
          }
        }
      },
    ])
  ],
  controllers: [FriendController]
})
export class FriendModule {}
