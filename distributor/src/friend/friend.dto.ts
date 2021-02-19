import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class FriendDto {
    @IsOptional()
    @IsString()
    @IsEmail()
    @MinLength(4)
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MinLength(4)
    target: string;
}