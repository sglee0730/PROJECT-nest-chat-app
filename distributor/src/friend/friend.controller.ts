import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FriendDto } from './friend.dto';

@Controller('friend')
export class FriendController {
    constructor(
        @Inject('FRIEND_SERVICE') private client: ClientProxy,
        @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy
    ) {}

    @Post()
    async scan(@Body() friend: FriendDto) {
        return await this.client.send('friends', friend).toPromise();
    }
    
    @Post('recommendation')
    async recommend(@Body() friend: FriendDto) {
        return await this.client.send('recommendation', friend).toPromise();
    } 

    @Post('search')
    async search(@Body() friend: FriendDto) {
        return await this.client.send('search', friend).toPromise();
    }

    @Post('connect')
    async connect(@Body() friend: FriendDto) {
        const result = await this.client.send('connect', friend).toPromise();
        return result;
    }

    @Post('disconnect')
    async disconnect(@Body() friend: FriendDto) {
        return await this.client.send('disconnect', friend).toPromise();
    }
}
