import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller()
export class TaskController {

    constructor(private taskService: TaskService) {}

    @MessagePattern('create')
    async create(@Payload() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @MessagePattern('scan')
    async scan(@Payload() createTaskDto: CreateTaskDto) {
        return this.taskService.scan(createTaskDto);
    }

    @MessagePattern('update')
    async update(@Payload() createTaskDto: CreateTaskDto) {
        return this.taskService.updateTask(createTaskDto);
    }

    @MessagePattern('delete')
    async delete(@Payload() createTaskDto: CreateTaskDto) {
        return this.taskService.deleteOneTask(createTaskDto);
    }
}
