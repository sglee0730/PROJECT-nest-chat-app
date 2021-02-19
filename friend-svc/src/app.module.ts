import { Module } from '@nestjs/common';
import { FriendModule } from './friend/friend.module';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [
    FriendModule, 
    Neo4jModule,
  ],
})
export class AppModule {}
