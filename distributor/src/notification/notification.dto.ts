import { IsString, MaxLength, MinLength } from "class-validator";

export class getDto {
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    email: string;

    @IsString()
    date: string;
}

export class produceDto {
    @IsString()
    producer: string;

    @IsString()
    @MaxLength(20)
    @MinLength(4)
    email: string; 

    @IsString()
    message: string;
}