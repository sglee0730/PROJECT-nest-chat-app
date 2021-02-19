import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { getDto, produceDto } from './dto/dynamo.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
    constructor(private service: NotificationService) {}

    @MessagePattern('scan')
    async scan(@Payload() _) {
        return this.service.scan();
    }

    @MessagePattern('produce')
    async put(@Payload() dto: produceDto) {
        return this.service.put(dto);
    };

    @MessagePattern('get')
    async get(@Payload() dto: getDto) {
        return this.service.get(dto);
    }

    @MessagePattern('update')
    async update(@Payload() dto: getDto) {
        return this.service.update(dto);
    }
}
