import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class getDto {
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    email: string;

    @IsOptional()
    message_id: string;
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