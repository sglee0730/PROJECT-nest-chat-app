import { Body, Controller, Post, ServiceUnavailableException } from '@nestjs/common';
import { FriendshipDto } from './dto/friendship.dto';
import { FriendService } from './friend.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class FriendController {
    constructor(private friendService: FriendService) {}

    @MessagePattern('signup')
    async createUser(@Payload() friendshipDto: FriendshipDto): Promise<object | ServiceUnavailableException> {
        const result = await this.friendService.createUser(friendshipDto);
        return result;
    }

    @MessagePattern('connect')
    async connectUser(@Payload() friendshipDto: FriendshipDto): Promise<object | ServiceUnavailableException> {
        const result = await this.friendService.connectUser(friendshipDto);
        return result;
    }

    @MessagePattern('disconnect')
    async disconnectUser(@Payload() friendshipDto: FriendshipDto): Promise<object | ServiceUnavailableException> {
        const result = await this.friendService.disconnectUser(friendshipDto);
        return result;
    }

    @MessagePattern('friends')
    async findFriends(@Payload() friendshipDto: FriendshipDto): Promise<object | ServiceUnavailableException> {
        const result = await this.friendService.getFriends(friendshipDto);
        return result;
    }

    @MessagePattern('recommendation')
    async friendRecommendation(@Payload() friendshipDto: FriendshipDto): Promise<object | ServiceUnavailableException> {
        const result = await this.friendService.friendRecommendation(friendshipDto);
        return result;
    }

    @MessagePattern('search')
    async searchUser(@Payload() friendshipDto: FriendshipDto): Promise<any | ServiceUnavailableException> {
        const result = await this.friendService.searchUser(friendshipDto);
        return result;
    }
}
