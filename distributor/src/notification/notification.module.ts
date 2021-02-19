import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitConfig } from 'src/config/rabbit.config';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    ClientsModule.register([
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
  controllers: [NotificationController]
})
export class NotificationModule {}
