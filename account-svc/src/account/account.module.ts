import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/redis/redis.module';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';
import { jwtConstants } from '../config/jwt-constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    RedisModule,
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
