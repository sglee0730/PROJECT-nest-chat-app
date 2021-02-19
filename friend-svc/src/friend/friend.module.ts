import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { neoConfig } from 'src/config/neo4j.config';

@Module({
  imports: [
    Neo4jModule.register({
      scheme: 'neo4j',
      host: neoConfig.host,
      port: neoConfig.port,
      username: neoConfig.username,
      password: neoConfig.password
    }),
  ],
  providers: [FriendService],
  controllers: [FriendController]
})
export class FriendModule {

}
