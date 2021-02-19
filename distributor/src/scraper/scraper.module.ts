import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitConfig } from 'src/config/rabbit.config';
import { ScraperController } from './scraper.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCRAPER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${rabbitConfig}`],
          queue: 'scraper_queue',
          queueOptions: {
            durable: false
          }
        }
      }, 
    ])
  ],
  controllers: [ScraperController]
})
export class ScraperModule {}
