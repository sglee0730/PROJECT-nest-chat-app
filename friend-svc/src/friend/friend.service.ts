import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { FriendshipDto } from './dto/friendship.dto';
import { myCypher } from './user.cypher';

@Injectable()
export class FriendService {
    constructor(private neo4jService: Neo4jService) {}

    async createUser(friendshipDto: FriendshipDto): Promise<{ success: Boolean, message: string } | ServiceUnavailableException> {
        const { email, username } = friendshipDto;
        try {
            await this.neo4jService.write(myCypher.create, { email: email, username: username });
            return {
                success: true,
                message: "User registed successful."
            };
        } catch (error) {
            throw new ServiceUnavailableException('Failed to create user');
        }
    };

    async connectUser(friendshipDto: FriendshipDto): Promise<{ success: Boolean, message: string } | ServiceUnavailableException> {
        const { email, target } = friendshipDto;
        try {
            await this.neo4jService.write(myCypher.update, { request: email, response: target });
            return {
                success: true,
                message: `${target} has become your friend.`,
            }
        } catch (error) {
            throw new ServiceUnavailableException('Failed to connect relationship');
        }
    };

    async disconnectUser(friendshipDto: FriendshipDto): Promise<{ success: Boolean, message: string } | ServiceUnavailableException> {
        const { email, target } = friendshipDto;
        try {
            await this.neo4jService.write(myCypher.delete, { request: email, response: target });
            return {
                success: true,
                message: `${target} say goodbye to you.`,
            }
        } catch (error) {
            throw new ServiceUnavailableException('Failed to disconnect relationship')
        }
    };

    async getFriends(friendshipDto: FriendshipDto): Promise<{ success: Boolean, result: any } | ServiceUnavailableException> {
        const { email } = friendshipDto;
        try {
            const result = await this.neo4jService.read(myCypher.has1Rel, { email: email });
            const friends = result.records.map((item: any) => {
                return item._fields[0].properties;
            });

            return {
                success: true,
                result: friends,
            } 
        } catch (error) {
            throw new ServiceUnavailableException('Failed to find your friend');
        }
    }

    async friendRecommendation(friendshipDto: FriendshipDto): Promise<{ success: Boolean, result: any } | ServiceUnavailableException> {
        const { email } = friendshipDto;
        try {
            const result = await this.neo4jService.read(myCypher.has2CommonRel, { email: email });
            const friends = result.records.map((item: any) => {
                return item._fields[0].properties;
            });

            return {
                success: true,
                result: friends,
            } 
        } catch (error) {
            throw new ServiceUnavailableException('Failed to find your friend');
        }
    }

    async searchUser(friendshipDto: FriendshipDto): Promise<{ success: Boolean, result: any } | ServiceUnavailableException> {
        const { username } = friendshipDto;
        try {
            const result = await this.neo4jService.read(myCypher.search, { username: username });
            const results = result.records.map((item: any) => {
                return item._fields[0].properties;
            })

            return {
                success: true,
                result: results
            }
        } catch (error) {
            throw new ServiceUnavailableException('Failed to find any user');
        }
    }
}
