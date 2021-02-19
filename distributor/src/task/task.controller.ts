import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TaskDto } from './task.dto';

@Controller('task')
export class TaskController {
    constructor(@Inject('TASK_SERVICE') private client: ClientProxy) {}

    @Post('create')
    async createTask(@Body() task: TaskDto) {
        return await this.client.send('create', task).toPromise();
    }
    
    @Post('scan')
    async findAllTask(@Body() task: TaskDto) {
        return await this.client.send('scan', task).toPromise();
    }

    @Post('update')
    async updateTask(@Body() task: TaskDto) {
        return await this.client.send('update', task).toPromise();
    }

    @Post('delete')
    async deleteTask(@Body() task: TaskDto) {
        return await this.client.send('delete', task).toPromise();
    }
}
