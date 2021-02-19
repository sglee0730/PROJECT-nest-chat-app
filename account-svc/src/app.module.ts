import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AccountModule } from './account/account.module';
import { typeOrmConfig } from './config/typeorm.config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    RedisModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
