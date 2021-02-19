import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitConfig } from 'src/config/rabbit.config';
import { TaskController } from './task.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${rabbitConfig}`],
          queue: 'task_queue',
          queueOptions: {
            durable: false
          }
        }
      }, 
    ])
  ],
  controllers: [TaskController]
})
export class TaskModule {}
