import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    description: string;

    @IsOptional()
    _id: string
}