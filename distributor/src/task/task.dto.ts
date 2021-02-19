import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class TaskDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @IsEmail()
    email: string;

    @IsString()
    description: string;   
}