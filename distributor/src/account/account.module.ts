import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitConfig } from 'src/config/rabbit.config';
import { AccountController } from './account.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${rabbitConfig}`],
          queue: 'account_queue',
          queueOptions: {
            durable: false
          }
        }
      },
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
    ])
  ],
  controllers: [AccountController]
})
export class AccountModule {}
