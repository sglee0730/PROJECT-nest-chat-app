import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { rabbitConfig } from './config/rabbitmq.config';

const logger = new Logger('FriendService');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitConfig.host}:${rabbitConfig.port}`],
      queue: 'friend_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.startAllMicroservices(() => {
    logger.log('Starting microservice!');
  })
  .listen(5000, () => {
    logger.log('Friend Service is listening');
  })
}
bootstrap();
