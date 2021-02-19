import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FriendDto } from './friend.dto';

@Controller('friend')
export class FriendController {
    constructor(
        @Inject('FRIEND_SERVICE') private client: ClientProxy,
        @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy
    ) {}

    @Post()
    async scan(friend: FriendDto) {
        return await this.client.send('friends', friend).toPromise();
    }
    
    @Post('recommendation')
    async recommend(friend: FriendDto) {
        return await this.client.send('recommendation', friend).toPromise();
    } 

    @Post('search')
    async search(friend: FriendDto) {
        return await this.client.send('search', friend).toPromise();
    }

    @Post('connect')
    async connect(friend: FriendDto) {
        const { email, target } = friend;
        const result = await this.client.send('connect', friend).toPromise();
        await this.notificationClient.send('produce', { 
            email: email, 
            producer: 'friendService', 
            message: `${email} is friend of ${target}` })
        .toPromise();

        return result;
    }

    @Post('disconnect')
    async disconnect(friend: FriendDto) {
        return await this.client.send('disconnect', friend).toPromise();
    }
}
