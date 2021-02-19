import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { getDto, produceDto } from './notification.dto';

@Controller('notification')
export class NotificationController {
    constructor(@Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy) {}

    @Post()
    async scan(@Body() dto) {
        return await this.notificationClient.send('scan', dto).toPromise();
    }

    @Post('produce')
    async put(@Body() dto) {
        return await this.notificationClient.send('produce', dto).toPromise();
    }

    @Post('get')
    async get(@Body() dto: getDto) {
        return await this.notificationClient.send('get', dto).toPromise()
    }

    @Post('update')
    async update(@Body() dto: getDto) {
        return await this.notificationClient.send('update', dto).toPromise()
    }
}
