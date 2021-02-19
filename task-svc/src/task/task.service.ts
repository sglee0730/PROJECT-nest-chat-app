import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
 
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const createdTask = new this.taskModel(createTaskDto);
        return await createdTask.save();
    }

    async scan(createTaskDto: CreateTaskDto): Promise<Task[]> {
        const { email } = createTaskDto;
        return await this.taskModel.find({ email: email }).sort({ date: 'asc' });
    } 

    async updateTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { _id, description } = createTaskDto;
        return await this.taskModel.updateOne({ _id: _id }, { description: description });
    }

    async deleteOneTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { _id } = createTaskDto;
        return await this.taskModel.deleteOne({ _id: _id });
    }
}
